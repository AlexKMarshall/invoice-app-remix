import { Form as RemixForm, Link as RemixLink } from '@remix-run/react'
import { format, startOfToday } from 'date-fns'

import { Button } from '~/components/atoms/button'
import { Input } from '~/components/atoms/input'
import type { postInvoiceFormSchema } from '~/models/invoice.validator'
import { useId } from 'react'
import type { z } from 'zod'

type Props = {
  errors?: z.inferFlattenedErrors<typeof postInvoiceFormSchema>
  Link?: typeof RemixLink
  Form?: typeof RemixForm
}
export function NewInvoiceForm({
  errors,
  Link = RemixLink,
  Form = RemixForm,
}: Props): JSX.Element {
  const billFromId = useId()
  const billToId = useId()

  return (
    <Form method="post">
      <h1 className="mb-6 text-2xl font-bold text-strong">New Invoice</h1>
      <h2
        id={billFromId}
        className="mb-6 font-bold text-violet-600 dark:text-violet-400"
      >
        Bill From
      </h2>
      <fieldset
        aria-labelledby={billFromId}
        className="grid grid-cols-2 gap-6 mb-10"
      >
        <Input
          label="Street Address"
          name="fromAddressLineOne"
          colSpan="col-span-full"
          errorMessage={errors?.fieldErrors.fromAddressLineOne?.join(',')}
        />
        <Input
          label="City"
          name="fromAddressCity"
          errorMessage={errors?.fieldErrors.fromAddressCity?.join(',')}
        />
        <Input
          label="Post Code"
          name="fromAddressPostcode"
          errorMessage={errors?.fieldErrors.fromAddressPostcode?.join(',')}
        />
        <Input
          label="Country"
          name="fromAddressCountry"
          colSpan="col-span-full"
          errorMessage={errors?.fieldErrors.fromAddressCountry?.join(',')}
        />
      </fieldset>
      <h2
        id={billToId}
        className="mb-6 font-bold text-violet-600 dark:text-violet-400"
      >
        Bill To
      </h2>
      <fieldset
        aria-labelledby={billToId}
        className="grid grid-cols-2 gap-6 mb-10"
      >
        <Input
          label="Client's Name"
          name="clientName"
          colSpan="col-span-full"
          errorMessage={errors?.fieldErrors.clientName?.join(',')}
        />
        <Input
          label="Client's Email"
          name="clientEmail"
          type="email"
          colSpan="col-span-full"
          errorMessage={errors?.fieldErrors.clientName?.join(',')}
        />
        <Input
          label="Street Address"
          name="clientAddressLineOne"
          colSpan="col-span-full"
          errorMessage={errors?.fieldErrors.clientAddressLineOne?.join(',')}
        />
        <Input
          label="City"
          name="clientAddressCity"
          errorMessage={errors?.fieldErrors.clientAddressCity?.join(',')}
        />
        <Input
          label="Post Code"
          name="clientAddressPostcode"
          errorMessage={errors?.fieldErrors.clientAddressPostcode?.join(',')}
        />
        <Input
          label="Country"
          name="clientAddressCountry"
          colSpan="col-span-full"
          errorMessage={errors?.fieldErrors.clientAddressCountry?.join(',')}
        />
      </fieldset>

      <Input
        label="Invoice Date"
        name="issuedAt"
        type="date"
        defaultValue={format(startOfToday(), 'yyyy-MM-dd')}
        mb="mb-6"
        errorMessage={errors?.fieldErrors.issuedAt?.join(',')}
      />
      <Input
        label="Payment Terms"
        name="paymentTerms"
        type="number"
        mb="mb-6"
        errorMessage={errors?.fieldErrors.paymentTerms?.join(',')}
      />
      <Input
        label="Project Description"
        name="projectDescription"
        mb="mb-16"
        errorMessage={errors?.fieldErrors.projectDescription?.join(',')}
      />

      <h2 className="mb-6 text-lg font-bold text-muted">Item list</h2>
      <div className="flex flex-col gap-6 mb-20">
        <Input
          label="Item Name"
          name="itemName"
          errorMessage={errors?.fieldErrors.itemName?.join(',')}
        />
        <div className="flex gap-4">
          <Input
            label="Qty."
            name="itemQuantity"
            aria-label="Quantity"
            type="number"
            errorMessage={errors?.fieldErrors.itemQuantity?.join(',')}
          />
          <Input
            label="Price"
            name="itemPrice"
            type="number"
            errorMessage={errors?.fieldErrors.itemPrice?.join(',')}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          color="secondary"
          as={Link}
          to={{ pathname: '/invoices' }}
          type="button"
          px="px-4"
          mr="mr-auto"
        >
          Discard
        </Button>
        <Button
          color="monochrome"
          type="submit"
          name="status"
          value="draft"
          px="px-4"
        >
          Save as Draft
        </Button>
        <Button
          color="primary"
          type="submit"
          name="status"
          value="pending"
          px="px-4"
        >
          Save &amp; Send
        </Button>
      </div>
    </Form>
  )
}
