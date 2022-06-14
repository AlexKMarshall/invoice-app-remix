import clsx from 'clsx'

type Props = { id: string }
export function InvoiceId({ id }: Props): JSX.Element {
  return (
    <span
      className={clsx(
        'font-bold uppercase text-strong',
        'before:font-medium before:text-regular before:content-["#"]'
      )}
    >
      {id}
    </span>
  )
}
