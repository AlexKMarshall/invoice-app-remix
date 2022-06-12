import { InvoiceSummary } from '~/components/molecules/invoice-summary'
import type { InvoiceSummary as InvoiceSummaryType } from '~/models/invoice.server'
import { Link as RemixLink } from '@remix-run/react'
import clsx from 'clsx'

type Props = {
  invoices: InvoiceSummaryType[]
  Link?: typeof RemixLink
}
export function Invoices({ invoices, Link = RemixLink }: Props): JSX.Element {
  const invoiceCount = invoices.length
  return (
    <div className={clsx('space-y-8', 'sm:space-y-14 lg:space-y-16')}>
      <div className="space-y-1">
        <h1 className={clsx('text-xl font-bold text-strong', 'sm:text-3xl')}>
          Invoices
        </h1>
        <p>There are {invoiceCount} total invoices</p>
      </div>
      <ul className="space-y-4">
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <InvoiceSummary {...invoice} Link={Link} />
          </li>
        ))}
      </ul>
    </div>
  )
}
