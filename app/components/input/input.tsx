import type { Except, SetRequired } from 'type-fest'

import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = { label: string; errorMessage?: string } & SetRequired<
  Except<
    InputHTMLAttributes<HTMLInputElement>,
    'className' | 'aria-invalid' | 'aria-errormessage'
  >,
  'id'
>
export function Input({ label, errorMessage, ...props }: Props): JSX.Element {
  const errorMessageId = `${props.id}-error`
  return (
    <div
      className={clsx(
        'flex flex-col gap-2',
        props.readOnly ? 'opacity-50' : ''
      )}
    >
      <div
        className={clsx(
          'flex flex-wrap justify-between gap-x-4 gap-y-2',
          errorMessage ? 'text-red-600 dark:text-red-500' : ''
        )}
      >
        <label htmlFor={props.id}>{label}</label>
        <p id={errorMessageId} aria-live="polite">
          {errorMessage}
        </p>
      </div>
      <input
        {...props}
        aria-invalid={Boolean(errorMessage)}
        aria-errorMessage={errorMessageId}
        className={clsx(
          'rounded-sm bg-gray-50 px-5 py-4 font-bold text-strong caret-violet-600 outline outline-2 outline-regular/40',
          'focus-visible:outline-violet-600',
          'dark:bg-gray-800 dark:outline-transparent dark:focus-visible:outline-violet-600',
          'aria-invalid:outline-red-600 aria-invalid:dark:outline-red-500'
        )}
      />
    </div>
  )
}
