import { ArrowRightIcon } from '~/components/atoms/icons'
import { InvoiceId } from '~/components/atoms/invoice-id'
import type { InvoiceListItem as InvoiceListItemType } from '~/models/invoice.validator'
import type { MouseEventHandler } from 'react'
import { Link as RemixLink } from '@remix-run/react'
import { StatusBadge } from '~/components/atoms/status-badge'
import clsx from 'clsx'
import useClickUnlessDrag from '~/hooks/use-click-unless-drag'
import { useRef } from 'react'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

type Props = InvoiceListItemType & {
  Link?: typeof RemixLink
}
export function InvoiceListItem({
  id,
  clientName,
  dueAt,
  totalAmount,
  currency,
  status,
  Link = RemixLink,
}: Props): JSX.Element {
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  })

  const href = `/invoices/${id}`

  const anchorRef = useRef<HTMLAnchorElement>(null)

  const handleInvoiceClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const clickedOnAnchor =
      event.target instanceof Node && anchorRef.current?.contains(event.target)
    if (clickedOnAnchor) return
    anchorRef.current?.click()
  }

  const invoiceClickProps = useClickUnlessDrag({ onClick: handleInvoiceClick })

  return (
    <article
      className={clsx(
        'flex max-w-screen-md cursor-pointer flex-col gap-6 rounded-md bg-white p-6 shadow-md shadow-slate-400/10 outline outline-2 outline-transparent',
        'dark:bg-slate-800',
        'focus-within:outline-violet-600 hover:outline-violet-600',
        'sm:grid sm:grid-cols-[9%_12%_1fr_1fr_20%] sm:items-baseline sm:gap-10 sm:py-4'
      )}
      {...invoiceClickProps}
    >
      <div
        className={clsx(
          'flex flex-wrap justify-between gap-x-6 gap-y-2',
          'sm:contents'
        )}
      >
        <h2 className="sm:-order-2">
          <Link to={href} className="focus:outline-none" ref={anchorRef}>
            <InvoiceId id={id} />
          </Link>
        </h2>
        <p className="sm:grow">{clientName}</p>
      </div>
      <div
        className={clsx(
          'flex flex-wrap items-end justify-between gap-x-6 gap-y-2',
          'sm:contents'
        )}
      >
        <div
          className={clsx(
            'flex flex-col gap-2 justify-self-start',
            'sm:contents'
          )}
        >
          <p className="sm:-order-1">{dateFormatter.format(dueAt)}</p>
          <p
            className={clsx(
              'text-base font-bold text-strong',
              'sm:grow sm:text-end'
            )}
          >
            {currencyFormatter.format(totalAmount)}
          </p>
        </div>
        <div className="flex gap-5 basis-28 sm:basis-36">
          <StatusBadge status={status} />
          <ArrowRightIcon className="flex-none hidden w-2 text-violet-600 sm:inline" />
        </div>
      </div>
    </article>
  )
}
