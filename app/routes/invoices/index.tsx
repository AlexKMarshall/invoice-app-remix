import { json, useLoaderData } from 'remix-utils'

import type { InvoiceListItem } from '~/models/invoice.server'
import { Invoices } from '~/components/organisms/invoices'
import type { LoaderFunction } from '@remix-run/node'
import { getInvoiceListItems } from '~/models/invoice.server'
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
  return json<LoaderData>({ invoiceListItems }, { replacer })
}

export default function InvoicesIndexPage() {
  const { invoiceListItems } = useLoaderData({
    reviver,
    validator: z.object({
      invoiceListItems: z.array(
        z.object({
          id: z.string(),
          due: z.date(),
          customerName: z.string(),
          totalAmount: z.number(),
          currency: z.enum(['GBP']),
          status: z.enum(['paid', 'pending', 'draft']),
        })
      ),
    }).parse,
  })

  return <Invoices invoiceListItems={invoiceListItems} />
}
