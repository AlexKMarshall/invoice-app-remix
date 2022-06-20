import { Button } from '~/components/atoms/button'
import { Input } from '~/components/atoms/input'
import { Link as RemixLink } from '@remix-run/react'

type Props = {
  Link?: typeof RemixLink
}
export function NewInvoiceForm({ Link = RemixLink }: Props): JSX.Element {
  return (
    <form>
      <h2>Bill From</h2>
      <Input
        label="Street Address"
        id="from-street-address"
        name="fromStreetAddress"
      />
      <Input label="City" id="from-city" name="fromCity" />
      <Input label="Post Code" id="from-post-code" name="fromPostCode" />
      <Input label="Country" id="from-country" name="fromCountry" />
      <h2>Bill To</h2>
      <Input label="Client's Name" id="client-name" name="clientName" />
      <Input
        label="Street Address"
        id="to-street-address"
        name="toStreetAddress"
      />
      <Input label="City" id="to-city" name="toCity" />
      <Input label="Post Code" id="to-post-code" name="toPostCode" />
      <Input label="Country" id="to-country" name="toCountry" />

      <Input
        label="Invoice Date"
        id="invoice-date"
        name="invoiceDate"
        type="date"
      />
      <Input label="Payment Terms" id="payment-terms" name="paymentTerms" />
      <Input
        label="Project Description"
        id="project-description"
        name="projectDescription"
      />

      <h2>Item list</h2>
      <Input label="Item Name" id="item-name" name="itemName" />
      <Input label="Qty." id="item-quantity" name="itemQuantity" />
      <Input label="Price" id="item-price" name="itemPrice" />
      <Button
        color="secondary"
        as={Link}
        to={{ pathname: '/invoices' }}
        type="button"
      >
        Discard
      </Button>
      <Button color="monochrome" type="submit" name="status" value="draft">
        Save as Draft
      </Button>
      <Button color="primary" type="submit" name="status" value="pending">
        Save &amp; Send
      </Button>
    </form>
  )
}
