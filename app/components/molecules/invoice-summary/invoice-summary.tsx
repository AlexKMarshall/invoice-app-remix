import clsx from 'clsx'
import { InvoiceId } from '~/components/atoms/invoice-id'
import { StatusBadge } from '~/components/atoms/status-badge'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

type Props = {
  id: string
  name: string
  due: Date
  amount: number
  currency: 'GBP'
  status: 'paid' | 'pending' | 'draft'
}
export function InvoiceSummary({
  id,
  name,
  due,
  amount,
  currency,
  status,
}: Props): JSX.Element {
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  })

  return (
    <article
      className={clsx(
        'flex cursor-pointer flex-col gap-6 rounded-md bg-white p-6 outline outline-2 outline-transparent',
        'dark:bg-slate-800'
      )}
    >
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-2">
        <h2>
          <InvoiceId id={id} />
        </h2>
        <p>{name}</p>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div className="space-y-2 justify-self-start">
          <p>{dateFormatter.format(due)}</p>
          <p className="text-base font-bold text-strong">
            {currencyFormatter.format(amount)}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>
    </article>
  )
}
