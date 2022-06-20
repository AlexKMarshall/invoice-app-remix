import type { Except } from 'type-fest'
import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import { useId } from 'react'

type Props = {
  label: string
  errorMessage?: string
  colSpan?: ResponsiveColSpan
} & Except<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'aria-invalid' | 'aria-errormessage'
>
export function Input({
  label,
  errorMessage,
  id,
  colSpan,
  ...props
}: Props): JSX.Element {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorMessageId = `${inputId}-error`
  return (
    <div
      className={clsx(
        'flex flex-col gap-2',
        props.disabled ? 'opacity-50' : '',
        colSpan
      )}
    >
      <div
        className={clsx(
          'flex flex-wrap justify-between gap-x-4 gap-y-2',
          errorMessage ? 'text-red-600 dark:text-red-500' : ''
        )}
      >
        <label htmlFor={inputId}>{label}</label>
        <p id={errorMessageId} aria-live="polite">
          {errorMessage}
        </p>
      </div>
      <input
        {...props}
        id={inputId}
        aria-invalid={errorMessage ? true : undefined}
        aria-errormessage={errorMessageId}
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

type ColSpan =
  | 'col-span-1'
  | 'col-span-2'
  | 'col-span-3'
  | 'col-span-4'
  | 'col-span-5'
  | 'col-span-6'
  | 'col-span-7'
  | 'col-span-8'
  | 'col-span-9'
  | 'col-span-10'
  | 'col-span-11'
  | 'col-span-12'
  | 'col-span-full'

type BreakPoint = '' | 'sm:' | 'md:' | 'lg:'

type ResponsiveColSpan = `${BreakPoint}${ColSpan}`
