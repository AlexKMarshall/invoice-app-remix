import { Decimal } from '@prisma/client/runtime'
import type { InvoiceListItem } from './invoice.validator'
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
      due: true,
      client: {
        select: { name: true },
      },
      totalAmount: true,
      currency: true,
      status: true,
    },
    orderBy: {
      due: 'desc',
    },
  })

  const schema = schemaForInputType<typeof queryResult>()(
    z.array(
      invoiceListItemSchema
        .omit({ totalAmount: true, customerName: true })
        .extend({
          totalAmount: z
            .instanceof(Decimal)
            .transform((value) => value.toNumber()),
          client: z.object({ name: z.string() }),
        })
    )
  )

  return schema.parse(queryResult).map(({ client, ...invoice }) => ({
    ...invoice,
    clientName: client.name,
  }))
}
