import type { ReactNode } from 'react'

type Props = { children: ReactNode }
export function ColorSchemeContainer({ children }: Props): JSX.Element {
  return (
    <div className="space-y-6 comp">
      <div className="p-4 space-y-4 rounded surface-1">
        <h2 className="text-lg font-bold text-strong">Light Mode</h2>
        <div>{children}</div>
      </div>
      <div className="dark">
        <div className="p-4 space-y-4 rounded surface-1">
          <h2 className="text-lg font-bold text-strong">Dark Mode</h2>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
