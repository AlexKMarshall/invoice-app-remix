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
      <h2 id={billFromId}>Bill From</h2>
      <fieldset aria-labelledby={billFromId}>
        <Input label="Street Address" name="fromStreetAddress" />
        <Input label="City" name="fromCity" />
        <Input label="Post Code" name="fromPostCode" />
        <Input label="Country" name="fromCountry" />
      </fieldset>
      <h2 id={billToId}>Bill To</h2>
      <fieldset aria-labelledby={billToId}>
        <Input label="Client's Name" name="clientName" />
        <Input label="Client's Email" name="clientName" type="email" />
        <Input label="Street Address" name="toStreetAddress" />
        <Input label="City" name="toCity" />
        <Input label="Post Code" name="toPostCode" />
        <Input label="Country" name="toCountry" />
      </fieldset>

      <Input label="Invoice Date" name="invoiceDate" type="date" />
      <Input label="Payment Terms" name="paymentTerms" />
      <Input label="Project Description" name="projectDescription" />

      <h2>Item list</h2>
      <Input label="Item Name" name="itemName" />
      <Input label="Qty." name="itemQuantity" aria-label="Quantity" />
      <Input label="Price" name="itemPrice" />
      <input type="hidden" name="status" value={status} />
      <Button
        color="secondary"
        as={Link}
        to={{ pathname: '/invoices' }}
        type="button"
      >
        Discard
      </Button>
      <Button
        color="monochrome"
        type="submit"
        onClick={() => setStatus('draft')}
      >
        Save as Draft
      </Button>
      <Button
        color="primary"
        type="submit"
        onClick={() => setStatus('pending')}
      >
        Save &amp; Send
      </Button>
    </Form>
  )
}
