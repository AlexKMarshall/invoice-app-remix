import type { InvoiceSummary } from '~/models/invoice.server'
import { Invoices } from '~/components/organisms/invoices'

const invoices: InvoiceSummary[] = [
  {
    id: 'rt3080',
    name: 'Jensen Huang',
    due: new Date('19 Aug 2021'),
    amount: 1800.9,
    currency: 'GBP',
    status: 'paid',
  },
  {
    id: 'xm9141',
    name: 'Alex Grim',
    due: new Date('20 Sep 2021'),
    amount: 556,
    currency: 'GBP',
    status: 'pending',
  },
  {
    id: 'rg0314',
    name: 'Alex Grim',
    due: new Date('01 Oct 2021'),
    amount: 14002.33,
    currency: 'GBP',
    status: 'paid',
  },
  {
    id: 'uv2353',
    name: 'Anita Wainwright',
    due: new Date('12 Nov 2021'),
    amount: 3102.04,
    currency: 'GBP',
    status: 'draft',
  },
]

export default function InvoicesIndexPage() {
  return <Invoices invoices={invoices} />
}
