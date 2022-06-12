import clsx from 'clsx'
import type { InputHTMLAttributes } from 'react'
import type { Except } from 'type-fest'

type Props = { label: string } & Except<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'type'
>
export function Checkbox({ label, ...props }: Props): JSX.Element {
  return (
    <label className="flex items-center gap-3 font-bold cursor-pointer touch-target text-strong">
      <input
        {...props}
        type="checkbox"
        className={clsx(
          'grid h-4 w-4 translate-y-[-10%] appearance-none place-content-center rounded-sm bg-surface-alt outline outline-2 outline-offset-2 outline-transparent',
          'before:h-2 before:w-2 before:scale-0 before:shadow-[inset_0.5rem_0.5rem] before:shadow-white',
          'before:[clip-path:polygon(14%_44%,0_65%,50%_100%,100%_16%,80%_0%,43%_62%)]', // checkmark polygon
          'checked:bg-violet-600 checked:before:scale-100',
          'hover:ring-2 hover:ring-inset hover:ring-violet-500',
          'focus-visible:outline-violet-600'
        )}
      />
      {label}
    </label>
  )
}
