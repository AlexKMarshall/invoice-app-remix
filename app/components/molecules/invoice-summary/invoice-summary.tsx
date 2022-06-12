import { InvoiceId } from '~/components/atoms/invoice-id'
import { StatusBadge } from '~/components/atoms/status-badge'
import clsx from 'clsx'
import type { MouseEventHandler, ReactNode, RefObject } from 'react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

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

  const href = `/invoices/${id}`

  const anchorRef = useRef<HTMLAnchorElement>(null)

  const { eventBoundaryRef } = useLinkActionContext()

  const handleStorybookLinkClick: MouseEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    event.preventDefault()
    eventBoundaryRef.current?.dispatchEvent(
      new CustomEvent('would-navigate', { detail: href })
    )
  }

  const handleInvoiceClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const clickedOnAnchor =
      event.target instanceof Node && anchorRef.current?.contains(event.target)
    if (clickedOnAnchor) return
    anchorRef.current?.click()
  }

  return (
    <article
      className={clsx(
        'flex cursor-pointer flex-col gap-6 rounded-md bg-white p-6 outline outline-2 outline-transparent',
        'dark:bg-slate-800',
        'focus-within:outline-violet-600 hover:outline-violet-600',
        'sm:flex-row sm:items-baseline'
      )}
      onClick={handleInvoiceClick}
    >
      <div
        className={clsx(
          'flex flex-wrap justify-between gap-x-6 gap-y-2',
          'sm:contents'
        )}
      >
        <h2 className="sm:-order-2">
          <a
            href={href}
            onClick={handleStorybookLinkClick}
            className="focus:outline-none"
            ref={anchorRef}
          >
            <InvoiceId id={id} />
          </a>
        </h2>
        <p className="sm:grow">{name}</p>
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
          <p className="sm:-order-1">{dateFormatter.format(due)}</p>
          <p
            className={clsx(
              'text-base font-bold text-strong',
              'sm:grow sm:text-end'
            )}
          >
            {currencyFormatter.format(amount)}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>
    </article>
  )
}

type LinkActionContextType = {
  eventBoundaryRef: RefObject<HTMLDivElement>
}
const LinkActionContext = createContext<LinkActionContextType | undefined>(
  undefined
)
const useLinkActionContext = () => {
  const context = useContext(LinkActionContext)
  if (!context)
    throw new Error(
      'useLinkActionContext must be used within LinkActionProvider'
    )
  return context
}

type LinkActionWrapperProps = {
  onWouldNavigate?: (event: CustomEvent['detail']) => void
  children: ReactNode
}
export const LinkActionWrapper = ({
  onWouldNavigate,
  children,
}: LinkActionWrapperProps) => {
  const [state, setState] = useState<'loading' | 'ready'>('loading')
  const eventBoundaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const eventBoundary = eventBoundaryRef.current
    const handleWouldNavigate = (e: Event) => {
      if (e instanceof CustomEvent) {
        onWouldNavigate?.(e.detail)
      }
    }

    if (eventBoundary) {
      eventBoundary.addEventListener('would-navigate', handleWouldNavigate)
      setState('ready')
      return () => {
        eventBoundary.removeEventListener('would-navigate', handleWouldNavigate)
      }
    }
  }, [onWouldNavigate])

  return (
    <LinkActionContext.Provider value={{ eventBoundaryRef }}>
      <div ref={eventBoundaryRef}>
        {state === 'ready' ? children : <div>Loading&hellip;</div>}
      </div>
    </LinkActionContext.Provider>
  )
}
