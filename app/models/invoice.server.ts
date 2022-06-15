import type { IterableElement } from 'type-fest'
import { prisma } from '~/db.server'
import { z } from 'zod'

const invoiceListItemSchema = z.object({
  id: z.string(),
  due: z.date(),
  customerName: z.string(),
  totalAmount: z.number(),
  currency: z.enum(['GBP']),
  status: z.enum(['paid', 'pending', 'draft']),
})

export function getInvoiceListItems() {
  const query = prisma.invoice.findMany({
    select: {
      id: true,
      due: true,
      customerName: true,
      totalAmount: true,
      currency: true,
      status: true,
    },
    orderBy: {
      due: 'desc',
    },
  })

  return z.promise(z.array(invoiceListItemSchema)).parse(query)
}

export type InvoiceListItem = IterableElement<
  Awaited<ReturnType<typeof getInvoiceListItems>>
>
