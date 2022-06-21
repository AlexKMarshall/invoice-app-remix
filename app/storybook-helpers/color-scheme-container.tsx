import type { ReactNode } from 'react'

type Props = {
  lightMode: ReactNode
  darkMode?: ReactNode
  layout?: 'padded' | 'fullwidth'
}
export function ColorSchemeContainer({
  lightMode,
  darkMode = lightMode,
  layout = 'padded',
}: Props): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="p-4 space-y-4 rounded surface-1">
        <h2 className="text-lg font-bold text-strong">Light Mode</h2>
        <div
          data-testId="light-mode"
          className={layout === 'fullwidth' ? '-mx-4' : ''}
        >
          {lightMode}
        </div>
      </div>
      <div className="dark">
        <div className="p-4 space-y-4 rounded surface-1">
          <h2 className="text-lg font-bold text-strong">Dark Mode</h2>
          <div
            data-testId="dark-mode"
            className={layout === 'fullwidth' ? '-mx-4' : ''}
          >
            {darkMode}
          </div>
        </div>
      </div>
    </div>
  )
}
