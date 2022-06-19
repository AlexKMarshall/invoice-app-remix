import { InvoiceListItem } from '~/components/molecules/invoice-list-item'
import type { InvoiceListItem as InvoiceListItemType } from '~/models/invoice.validator'
import { Link as RemixLink } from '@remix-run/react'
import clsx from 'clsx'

type Props = {
  invoiceListItems: InvoiceListItemType[]
  Link?: typeof RemixLink
}
export function Invoices({
  invoiceListItems,
  Link = RemixLink,
}: Props): JSX.Element {
  const invoiceCount = invoiceListItems.length
  return (
    <div className={clsx('space-y-8', 'sm:space-y-14 lg:space-y-16')}>
      <div className="space-y-1">
        <h1 className={clsx('text-xl font-bold text-strong', 'sm:text-3xl')}>
          Invoices
        </h1>
        <p>There are {invoiceCount} total invoices</p>
      </div>
      <ul className="space-y-4">
        {invoiceListItems.map((invoice) => (
          <li key={invoice.id}>
            <InvoiceListItem {...invoice} Link={Link} />
          </li>
        ))}
      </ul>
    </div>
  )
}
