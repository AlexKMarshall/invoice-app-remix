import type { ActionFunction } from '@remix-run/node'
import { Drawer } from '~/components/atoms/drawer/drawer'
import { NewInvoiceForm } from '~/components/screens/new-invoice-form'
import { getNewId } from '~/utils'
import { postInvoiceDtoSchema } from '~/models/invoice.validator'
import { prisma } from '~/db.server'
import { redirect } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const formEntries = Object.fromEntries(form.entries())
  const {
    issuedAt,
    paymentTerms,
    projectDescription,
    clientName,
    clientEmail,
    clientAddressLineOne,
    clientAddressCity,
    clientAddressPostcode,
    clientAddressCountry,
    fromAddressCity,
    fromAddressLineOne,
    fromAddressCountry,
    fromAddressPostcode,
    itemName,
    itemQuantity,
    itemPrice,
    status,
  } = postInvoiceDtoSchema.parse(formEntries)

  await prisma.invoice.create({
    data: {
      id: getNewId(),
      currency: 'GBP',
      address: {
        create: {
          lineOne: fromAddressLineOne,
          city: fromAddressCity,
          postcode: fromAddressPostcode,
          country: fromAddressCountry,
        },
      },
      client: {
        create: {
          name: clientName,
          email: clientEmail,
          address: {
            create: {
              lineOne: clientAddressLineOne,
              city: clientAddressCity,
              postcode: clientAddressPostcode,
              country: clientAddressCountry,
            },
          },
        },
      },
      issuedAt,
      paymentTerms,
      projectDescription,
      lineItem: {
        create: {
          name: itemName,
          quantity: itemQuantity,
          price: itemPrice,
        },
      },
      status,
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
