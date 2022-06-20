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
