import { parseISO } from 'date-fns'
import { z } from 'zod'

export const invoiceListItemSchema = z.object({
  id: z.string(),
  dueAt: z.date(),
  clientName: z.string(),
  totalAmount: z.number(),
  currency: z.enum(['GBP']),
  status: z.enum(['paid', 'pending', 'draft']),
})

export type InvoiceListItem = z.infer<typeof invoiceListItemSchema>

export const postInvoiceDtoSchema = z.object({
  fromAddressLineOne: z.string(),
  fromAddressCity: z.string(),
  fromAddressPostcode: z.string(),
  fromAddressCountry: z.string(),
  clientName: z.string(),
  clientEmail: z.string().email(),
  clientAddressLineOne: z.string(),
  clientAddressCity: z.string(),
  clientAddressPostcode: z.string(),
  clientAddressCountry: z.string(),
  issuedAt: z.preprocess((val) => parseISO(String(val)), z.date()),
  paymentTerms: z.preprocess((val) => Number(val), z.number()),
  projectDescription: z.string(),
  itemName: z.string(),
  itemQuantity: z.preprocess((val) => Number(val), z.number()),
  itemPrice: z.preprocess((val) => Number(val), z.number()),
  status: z.enum(['draft', 'pending']),
})
