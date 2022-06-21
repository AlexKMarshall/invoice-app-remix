import type { ActionFunction } from '@remix-run/node'
import { Drawer } from '~/components/atoms/drawer/drawer'
import { NewInvoiceForm } from '~/components/screens/new-invoice-form'
import { postInvoiceDtoSchema } from '~/models/invoice.validator'
import { redirect } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const formEntries = Object.fromEntries(form.entries())
  const validatedFormEntries = postInvoiceDtoSchema.parse(formEntries)

  return redirect('/invoices')
}

export default function InvoicesNewRoute() {
  return (
    <Drawer open={true}>
      <NewInvoiceForm />
    </Drawer>
  )
}
