import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import type { ClassValue } from 'clsx'
import type { Link } from '@remix-run/react'
import React from 'react'
import clsx from 'clsx'

type Color = 'primary' | 'secondary' | 'monochrome' | 'danger'

type ButtonOrLink = React.ElementType | typeof Link

// https://www.benmvp.com/blog/polymorphic-react-components-typescript/
type BaseProps<C extends ButtonOrLink> = {
  as?: C

  children: ReactNode
  color?: Color
}

type Props<C extends ButtonOrLink> = BaseProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof BaseProps<C> | 'className'>

export function Button<C extends ButtonOrLink = 'button'>({
  as,
  color = 'primary',
  ...props
}: Props<C>): JSX.Element {
  const Component = as || 'button'

  return (
    <Component
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
  monochrome: clsx(
    'bg-gray-700 text-gray-200',
    'hover:bg-gray-900',
    'focus-visible:outline-gray-900 focus-visible:bg-gray-900',
    'dark:hover:bg-gray-800',
    'dark:focus-visible:outline-gray-400 dark:focus-visible:bg-gray-800'
  ),
  danger: clsx(
    'bg-red-600 text-white',
    'hover:bg-red-400',
    'focus-visible:bg-red-400 focus-visible:outline-red-400'
  ),
}
