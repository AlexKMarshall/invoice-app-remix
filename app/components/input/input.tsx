import type { Except, SetRequired } from 'type-fest'

import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = { label: string } & SetRequired<
  Except<InputHTMLAttributes<HTMLInputElement>, 'className'>,
  'id'
>
export function Input({ label, ...props }: Props): JSX.Element {
  return (
    <div
      className={clsx(
        'flex flex-col gap-2',
        props.readOnly ? 'opacity-50' : ''
      )}
    >
      <label htmlFor={props.id}>{label}</label>
      <input
        {...props}
        className={clsx(
          'rounded-sm bg-transparent px-5 py-4 font-bold text-strong caret-violet-600 outline outline-2 outline-regular/40',
          'focus-visible:outline-violet-600',
          'dark:bg-gray-800 dark:outline-transparent dark:focus-visible:outline-violet-600'
        )}
      />
    </div>
  )
}
