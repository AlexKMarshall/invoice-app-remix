import type { Except, SetRequired } from 'type-fest'

import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = { label: string } & SetRequired<
  Except<InputHTMLAttributes<HTMLInputElement>, 'className' | 'aria-disabled'>,
  'id'
>
export function Input({ id, label, disabled, ...props }: Props): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        id={id}
        className={clsx(
          'rounded-sm bg-transparent px-5 py-4 font-bold text-strong caret-violet-600 outline outline-2 outline-regular/40',
          'focus-visible:outline-violet-600',
          'dark:bg-gray-800 dark:outline-transparent dark:focus-visible:outline-violet-600'
        )}
        aria-disabled={disabled}
      />
    </div>
  )
}
