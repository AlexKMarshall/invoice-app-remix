import type { ReactNode } from 'react'
import { Header } from '~/components/molecules/header'

type Props = {
  main: ReactNode
}
export function Layout({ main }: Props): JSX.Element {
  return (
    <div className="flex flex-col h-full lg:flex-row">
      <Header />
      <main className="flex-grow px-6 py-8 sm:px-12 sm:py-14 lg:py-16">
        <div className="max-w-3xl mx-auto">{main}</div>
      </main>
    </div>
  )
}
