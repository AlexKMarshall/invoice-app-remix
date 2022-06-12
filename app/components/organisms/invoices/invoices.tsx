import { InvoiceSummary } from '~/components/molecules/invoice-summary'
import type { InvoiceSummary as InvoiceSummaryType } from '~/models/invoice.server'
import { Link as RemixLink } from '@remix-run/react'

type Props = {
  invoices: InvoiceSummaryType[]
  Link?: typeof RemixLink
}
export function Invoices({ invoices, Link = RemixLink }: Props): JSX.Element {
  return (
    <>
      <h1>Invoices</h1>
      <p>There are 4 total invoices</p>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <InvoiceSummary {...invoice} Link={Link} />
          </li>
        ))}
      </ul>
    </>
  )
}
