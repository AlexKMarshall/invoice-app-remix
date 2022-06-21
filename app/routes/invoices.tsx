import { json, useLoaderData } from 'remix-utils'

import { InvoiceList } from '~/components/screens/invoice-list'
import type { InvoiceListItem } from '~/models/invoice.validator'
import type { LoaderFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { getInvoiceListItems } from '~/models/invoice.server'
import { invoiceListItemSchema } from '~/models/invoice.validator'
import { parseJSON } from 'date-fns'
import { z } from 'zod'

type LoaderData = {
  invoiceListItems: InvoiceListItem[]
}

type SerializedDate = { __type: 'date'; dateValue: string }
const serializeDate = (date: Date): SerializedDate => ({
  __type: 'date',
  dateValue: date.toJSON(),
})

function replacer(this: any, key: string, value: unknown) {
  const unserializedValue: unknown = this[key]
  if (unserializedValue instanceof Date) {
    return serializeDate(unserializedValue)
  }
  return value
}

function isSerializedDate(
  serializedValue: SerializedDate | object
): serializedValue is SerializedDate {
  return (serializedValue as SerializedDate).__type === 'date'
}

const reviver = (key: string, value: unknown) => {
  if (typeof value !== 'object' || value === null) return value
  if (isSerializedDate(value)) {
    return parseJSON(value.dateValue)
  }
  return value
}

export const loader: LoaderFunction = async () => {
  const invoiceListItems = await getInvoiceListItems()
  console.log(invoiceListItems)
  return json<LoaderData>({ invoiceListItems }, { replacer })
}

function schemaForInputType<T>() {
  return <S extends z.ZodType<any, any, T>>(arg: S) => arg
}

const validator = (data: unknown): LoaderData => {
  const schema = schemaForInputType<LoaderData>()(
    z.object({ invoiceListItems: z.array(invoiceListItemSchema) })
  )
  return schema.parse(data)
}

export default function InvoicesIndexPage() {
  const { invoiceListItems } = useLoaderData({
    reviver,
    validator,
  })

  return (
    <div>
      <InvoiceList items={invoiceListItems} />
      <Outlet />
    </div>
  )
}
