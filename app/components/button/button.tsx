import type { ButtonHTMLAttributes } from 'react'
import type { ClassValue } from 'clsx'
import clsx from 'clsx'

type Color = 'primary' | 'secondary'

const colorClassNameMap: Record<Color, ClassValue> = {
  primary: clsx(
    'bg-violet-600 text-white',
    'hover:bg-violet-500',
    'focus-visible:outline-violet-500 focus-visible:bg-violet-500'
  ),
  secondary: clsx(
    'bg-gray-50 text-[hsl(231deg_33%_53%)]',
    'hover:bg-[hsl(231deg_73%_93%)]',
    'focus-visible:outline-[hsl(231deg_73%_93%)] focus-visible:bg-[hsl(231deg_73%_93%)]',
    'dark:bg-gray-800 dark:text-gray-400',
    'dark:hover:bg-white',
    'dark:focus-visible:outline-white dark:focus-visible:bg-white'
  ),
}

type Props = { color?: Color } & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>
export function Button({ color = 'primary', ...props }: Props): JSX.Element {
  return (
    <button
      {...props}
      className={clsx(
        'rounded-full py-4 px-6 font-bold outline outline-transparent',
        'focus-visible:outline-2 focus-visible:outline-offset-4',
        'active:brightness-90',
        colorClassNameMap[color]
      )}
    />
  )
}
