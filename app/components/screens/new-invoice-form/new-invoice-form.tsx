import { Form as RemixForm, Link as RemixLink } from '@remix-run/react'

import { Button } from '~/components/atoms/button'
import { Input } from '~/components/atoms/input'
import { useState } from 'react'

type Props = {
  Link?: typeof RemixLink
  Form?: typeof RemixForm
}
export function NewInvoiceForm({
  Link = RemixLink,
  Form = RemixForm,
}: Props): JSX.Element {
  const [status, setStatus] = useState<'draft' | 'pending'>('draft')

  return (
    <Form>
      <h2>Bill From</h2>
      <Input label="Street Address" name="fromStreetAddress" />
      <Input label="City" name="fromCity" />
      <Input label="Post Code" name="fromPostCode" />
      <Input label="Country" name="fromCountry" />
      <h2>Bill To</h2>
      <Input label="Client's Name" name="clientName" />
      <Input label="Street Address" name="toStreetAddress" />
      <Input label="City" name="toCity" />
      <Input label="Post Code" name="toPostCode" />
      <Input label="Country" name="toCountry" />

      <Input label="Invoice Date" name="invoiceDate" type="date" />
      <Input label="Payment Terms" name="paymentTerms" />
      <Input label="Project Description" name="projectDescription" />

      <h2>Item list</h2>
      <Input label="Item Name" name="itemName" />
      <Input label="Qty." name="itemQuantity" />
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
