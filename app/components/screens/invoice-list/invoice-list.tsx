import { InvoiceListItem } from '~/components/molecules/invoice-list-item'
import type { InvoiceListItem as InvoiceListItemType } from '~/models/invoice.validator'
import { Link as RemixLink } from '@remix-run/react'
import clsx from 'clsx'
import { Button } from '~/components/atoms/button'

type Props = {
  items: InvoiceListItemType[]
  Link?: typeof RemixLink
}
export function InvoiceList({ items, Link = RemixLink }: Props): JSX.Element {
  const invoiceCount = items.length

  const smallCountText = `${invoiceCount} invoices`
  const largeCountText = `There are ${invoiceCount} total invoices`

  return (
    <div className={clsx('space-y-8', 'sm:space-y-14 lg:space-y-16')}>
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className={clsx('text-xl font-bold text-strong', 'sm:text-3xl')}>
            Invoices
          </h1>
          <p>
            <span className="sm:hidden">{smallCountText}</span>
            <span className="hidden sm:inline">{largeCountText}</span>
          </p>
        </div>
        <Button
          as={Link}
          to={{ pathname: '/invoices/new' }}
          aria-label="New Invoice"
        >
          <span className="sm:hidden">New</span>
          <span className="hidden sm:inline">New Invoice</span>
        </Button>
      </div>
      <ul className="space-y-4">
        {items.map((invoice) => (
          <li key={invoice.id}>
            <InvoiceListItem {...invoice} Link={Link} />
          </li>
        ))}
      </ul>
    </div>
  )
}
