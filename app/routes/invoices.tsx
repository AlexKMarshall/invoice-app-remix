import { Layout } from '~/components/screens/layout'
import { Outlet } from '@remix-run/react'

export default function InvoicesRoute() {
  return <Layout main={<Outlet />}></Layout>
}
