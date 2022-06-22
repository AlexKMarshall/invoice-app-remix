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

export const postDraftInvoiceFormSchema = z.object({
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
  status: z.literal('draft'),
})

export const postPendingInvoiceFormSchema = z.object({
  fromAddressLineOne: z.string().min(1),
  fromAddressCity: z.string().min(1),
  fromAddressPostcode: z.string().min(1),
  fromAddressCountry: z.string().min(1),
  clientName: z.string().min(1),
  clientEmail: z.string().min(1).email(),
  clientAddressLineOne: z.string().min(1),
  clientAddressCity: z.string().min(1),
  clientAddressPostcode: z.string().min(1),
  clientAddressCountry: z.string().min(1),
  issuedAt: z.preprocess((val) => parseISO(String(val)), z.date()),
  paymentTerms: z.preprocess((val) => Number(val), z.number().min(1)),
  projectDescription: z.string().min(1),
  itemName: z.string().min(1),
  itemQuantity: z.preprocess((val) => Number(val), z.number().min(1)),
  itemPrice: z.preprocess((val) => Number(val), z.number().min(0.01)),
  status: z.literal('pending'),
})

export const postInvoiceFormSchema = z.union([
  postDraftInvoiceFormSchema,
  postPendingInvoiceFormSchema,
])

export const parsePostInvoiceForm = (invoiceForm: FormData) => {
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
  } = postInvoiceFormSchema.parse(Object.fromEntries(invoiceForm.entries()))

  return {
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
}
