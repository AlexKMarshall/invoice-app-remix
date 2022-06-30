import { json, useActionData } from 'remix-utils'

import type { ActionFunction } from '@remix-run/node'
import { Drawer } from '~/components/atoms/drawer/drawer'
import { NewInvoiceForm } from '~/components/screens/new-invoice-form'
import { getNewId } from '~/utils'
import { postInvoiceFormSchema } from '~/models/invoice.validator'
import { prisma } from '~/db.server'
import { redirect } from '@remix-run/node'
import type { z } from 'zod'

type ActionData = {
  errors: z.inferFlattenedErrors<typeof postInvoiceFormSchema>
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const parsedForm = postInvoiceFormSchema.safeParse(Object.fromEntries(form))

  if (!parsedForm.success) {
    return json<ActionData>({ errors: parsedForm.error.flatten() })
  }

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
  } = parsedForm.data

  const newInvoiceData = {
    status,
    issuedAt,
    paymentTerms,
    projectDescription,
    client: {
      name: clientName,
      email: clientEmail,
      address: {
        lineOne: clientAddressLineOne,
        city: clientAddressCity,
        postcode: clientAddressPostcode,
        country: clientAddressCountry,
      },
    },
    address: {
      lineOne: fromAddressLineOne,
      city: fromAddressCity,
      postcode: fromAddressPostcode,
      country: fromAddressCountry,
    },
    item: {
      name: itemName,
      quantity: itemQuantity,
      price: itemPrice,
    },
  }

  const {
    address,
    client: { address: clientAddress, ...client },
    item,
    ...invoice
  } = newInvoiceData

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
  const actionData = useActionData<ActionData>({})

  const errors = actionData?.errors

  return (
    <Drawer open={true}>
      <NewInvoiceForm errors={errors} />
    </Drawer>
  )
}
