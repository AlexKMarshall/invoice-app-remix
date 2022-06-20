import { Form as RemixForm, Link as RemixLink } from '@remix-run/react'
import { useId, useState } from 'react'

import { Button } from '~/components/atoms/button'
import { Input } from '~/components/atoms/input'

type Props = {
  Link?: typeof RemixLink
  Form?: typeof RemixForm
}
export function NewInvoiceForm({
  Link = RemixLink,
  Form = RemixForm,
}: Props): JSX.Element {
  const [status, setStatus] = useState<'draft' | 'pending'>('draft')
  const billFromId = useId()
  const billToId = useId()

  return (
    <Form>
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
          name="fromStreetAddress"
          colSpan="col-span-full"
        />
        <Input label="City" name="fromCity" />
        <Input label="Post Code" name="fromPostCode" />
        <Input label="Country" name="fromCountry" colSpan="col-span-full" />
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
        />
        <Input
          label="Client's Email"
          name="clientEmail"
          type="email"
          colSpan="col-span-full"
        />
        <Input
          label="Street Address"
          name="toStreetAddress"
          colSpan="col-span-full"
        />
        <Input label="City" name="toCity" />
        <Input label="Post Code" name="toPostCode" />
        <Input label="Country" name="toCountry" colSpan="col-span-full" />
      </fieldset>

      <Input label="Invoice Date" name="invoiceDate" type="date" mb="mb-6" />
      <Input label="Payment Terms" name="paymentTerms" mb="mb-6" />
      <Input label="Project Description" name="projectDescription" mb="mb-16" />

      <h2 className="mb-6 text-lg font-bold text-muted">Item list</h2>
      <div className="flex flex-col gap-6 mb-20">
        <Input label="Item Name" name="itemName" />
        <div className="flex gap-4">
          <Input label="Qty." name="quantity" aria-label="Quantity" />
          <Input label="Price" name="price" />
        </div>
      </div>
      <input type="hidden" name="status" value={status} />
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
          onClick={() => setStatus('draft')}
          px="px-4"
        >
          Save as Draft
        </Button>
        <Button
          color="primary"
          type="submit"
          onClick={() => setStatus('pending')}
          px="px-4"
        >
          Save &amp; Send
        </Button>
      </div>
    </Form>
  )
}
