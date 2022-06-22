import {
  parsePostInvoiceForm,
  postInvoiceFormSchema,
} from '~/models/invoice.validator'

import type { ActionFunction } from '@remix-run/node'
import { Drawer } from '~/components/atoms/drawer/drawer'
import { NewInvoiceForm } from '~/components/screens/new-invoice-form'
import { getNewId } from '~/utils'
import { prisma } from '~/db.server'
import { redirect } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const {
    address,
    client: { address: clientAddress, ...client },
    item,
    ...invoice
  } = parsePostInvoiceForm(form)

  await prisma.invoice.create({
    data: {
      id: getNewId(),
      currency: 'GBP',
      address: {
        create: address,
      },
      client: {
        create: {
          ...client,
          address: {
            create: clientAddress,
          },
        },
      },
      lineItem: { create: item },
      ...invoice,
    },
  })

  return redirect('/invoices')
}

export default function InvoicesNewRoute() {
  return (
    <Drawer open={true}>
      <NewInvoiceForm />
    </Drawer>
  )
}
