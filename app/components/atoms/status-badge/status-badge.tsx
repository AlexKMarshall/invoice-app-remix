import type { ClassValue } from 'clsx'
import clsx from 'clsx'

type Status = 'pending' | 'paid' | 'draft'

const statusClassNameMap: Record<Status, ClassValue> = {
  paid: clsx(
    'text-emerald-800 bg-emerald-400/5 before:bg-emerald-400',
    'dark:text-emerald-400'
  ),
  pending: clsx(
    'text-amber-700 bg-amber-500/5 before:bg-amber-500',
    'dark:text-amber-500'
  ),
  draft: clsx(
    'text-zinc-700 bg-zinc-700/5 before:bg-zinc-700',
    'dark:text-zinc-300 dark:bg-zinc-300/5 dark:before:bg-zinc-300'
  ),
}

type Props = { status: Status }
export function StatusBadge({ status }: Props): JSX.Element {
  return (
    <p
      className={clsx(
        'inline-flex items-baseline justify-center gap-2 rounded px-4 py-3 font-bold capitalize',
        'basis-28', // hack until sub-grid
        'before:aspect-square before:w-2 before:rounded-full',
        statusClassNameMap[status]
      )}
    >
      {status}
    </p>
  )
}
