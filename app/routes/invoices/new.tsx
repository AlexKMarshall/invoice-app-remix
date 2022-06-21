import { Drawer } from '~/components/atoms/drawer/drawer'
import { NewInvoiceForm } from '~/components/screens/new-invoice-form'

export default function InvoicesNewRoute() {
  return (
    <Drawer open={true}>
      <NewInvoiceForm />
    </Drawer>
  )
}
