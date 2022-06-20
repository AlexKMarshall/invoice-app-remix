import { z } from 'zod'

export const invoiceListItemSchema = z.object({
  id: z.string(),
  due: z.date(),
  clientName: z.string(),
  totalAmount: z.number(),
  currency: z.enum(['GBP']),
  status: z.enum(['paid', 'pending', 'draft']),
})

export type InvoiceListItem = z.infer<typeof invoiceListItemSchema>
