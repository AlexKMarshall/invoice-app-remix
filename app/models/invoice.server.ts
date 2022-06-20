import { Decimal } from '@prisma/client/runtime'
import type { InvoiceListItem } from './invoice.validator'
import { addBusinessDays } from 'date-fns'
import { invoiceListItemSchema } from './invoice.validator'
import { prisma } from '~/db.server'
import { z } from 'zod'

function schemaForInputType<T>() {
  return <S extends z.ZodType<any, any, T>>(arg: S) => arg
}

export async function getInvoiceListItems(): Promise<InvoiceListItem[]> {
  const queryResult = await prisma.invoice.findMany({
    select: {
      id: true,
      issuedAt: true,
      paymentTerms: true,
      client: {
        select: { name: true },
      },
      currency: true,
      status: true,
      lineItem: {
        select: {
          quantity: true,
          price: true,
        },
      },
    },
    orderBy: {
      issuedAt: 'desc',
    },
  })

  const schema = schemaForInputType<typeof queryResult>()(
    z.array(
      invoiceListItemSchema
        .omit({ totalAmount: true, clientName: true, dueAt: true })
        .extend({
          client: z.object({ name: z.string() }),
          issuedAt: z.date(),
          paymentTerms: z.number(),
          lineItem: z.object({
            quantity: z.number(),
            price: z.instanceof(Decimal),
          }),
        })
    )
  )

  // currently there is no way to sort in prisma based on a computed field
  // so we have to do it manually on the result
  // For a small number of records, performance should be ok as the array
  // is approximately sorted already
  // However this likely will cause pagination to be more difficult than it
  // should be
  return schema
    .parse(queryResult)
    .map(({ client, issuedAt, paymentTerms, lineItem, ...invoice }) => ({
      ...invoice,
      clientName: client.name,
      dueAt: addBusinessDays(issuedAt, paymentTerms),
      totalAmount: lineItem.price.mul(lineItem.quantity).toNumber(),
    }))
    .sort((a, b) => a.dueAt.valueOf() - b.dueAt.valueOf())
}
