import clsx from 'clsx'
import type { AllHTMLAttributes } from 'react'
import type { Except } from 'type-fest'

type Props = Except<AllHTMLAttributes<HTMLDivElement>, 'className'> & {
  as?: 'header' | 'div'
}
export function Header({
  as: AsComponent = 'header',
  ...props
}: Props): JSX.Element {
  return (
    <AsComponent
      {...props}
      className={clsx(
        'flex flex-none justify-start overflow-hidden',
        'bg-gray-700 dark:bg-gray-800',
        'lg:flex-col lg:rounded-r-3xl'
      )}
    >
      <div
        className={clsx(
          'relative z-10 flex-none overflow-hidden rounded-r-3xl bg-violet-600 p-6 text-white',
          'before:absolute before:inset-0 before:-z-10 before:translate-y-[50%] before:rounded-tl-3xl before:bg-violet-500',
          'lg:p-8'
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 26"
          className="w-7 sm:w-8 lg:w-10"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
          />
        </svg>
      </div>
    </AsComponent>
  )
}
