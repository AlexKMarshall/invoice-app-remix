import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import tailwindStylesheetUrl from './styles/tailwind.css'
import { getUser } from './session.server'
import { Header } from './components/molecules/header'
import {
  DrawerPortal,
  DrawerPortalProvider,
} from './components/atoms/drawer/drawer'

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Spartan:wght@500;700&display=swap',
    },
    { rel: 'stylesheet', href: tailwindStylesheetUrl },
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Invoice App',
  viewport: 'width=device-width,initial-scale=1',
})

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  })
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>

      <body className="h-full font-medium">
        <DrawerPortalProvider>
          <div className="relative flex flex-col min-h-full lg:flex-row">
            <Header zIndex="z-20" />
            <main className="z-0 flex-grow px-6 py-8 sm:px-12 sm:py-14 lg:py-16">
              <div className="max-w-3xl mx-auto">
                <Outlet />
              </div>
            </main>
            <DrawerPortal />
          </div>
        </DrawerPortalProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
