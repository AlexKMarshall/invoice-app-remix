import type { InvoiceListItem } from '~/models/invoice.server'
import { Invoices } from '~/components/organisms/invoices'
import type { LoaderFunction } from '@remix-run/node'
import { getInvoiceListItems } from '~/models/invoice.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

const invoices: InvoiceListItem[] = [
  {
    id: 'rt3080',
    customerName: 'Jensen Huang',
    due: new Date('19 Aug 2021'),
    totalAmount: 1800.9,
    currency: 'GBP',
    status: 'paid',
  },
  {
    id: 'xm9141',
    customerName: 'Alex Grim',
    due: new Date('20 Sep 2021'),
    totalAmount: 556,
    currency: 'GBP',
    status: 'pending',
  },
  {
    id: 'rg0314',
    customerName: 'Alex Grim',
    due: new Date('01 Oct 2021'),
    totalAmount: 14002.33,
    currency: 'GBP',
    status: 'paid',
  },
  {
    id: 'uv2353',
    customerName: 'Anita Wainwright',
    due: new Date('12 Nov 2021'),
    totalAmount: 3102.04,
    currency: 'GBP',
    status: 'draft',
  },
]

type LoaderData = {
  invoiceListItems: InvoiceListItem[]
}

export const loader: LoaderFunction = async () => {
  const invoiceListItems = await getInvoiceListItems()
  return json<LoaderData>({ invoiceListItems })
}

export default function InvoicesIndexPage() {
  const loaderData = useLoaderData()

  return <Invoices invoices={invoices} />
}
