import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  const email = 'rachel@remix.run'

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  })

  const hashedPassword = await bcrypt.hash('racheliscool', 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })

  await prisma.note.create({
    data: {
      title: 'My first note',
      body: 'Hello, world!',
      userId: user.id,
    },
  })

  await prisma.note.create({
    data: {
      title: 'My second note',
      body: 'Hello, world!',
      userId: user.id,
    },
  })

  await prisma.invoice.create({
    data: {
      id: 'rt3080',
      customerName: 'Jensen Huang',
      due: new Date('19 Aug 2021'),
      totalAmount: 1800.9,
      currency: 'GBP',
      status: 'paid',
    },
  })
  await prisma.invoice.create({
    data: {
      id: 'xm9141',
      customerName: 'Alex Grim',
      due: new Date('20 Sep 2021'),
      totalAmount: 556,
      currency: 'GBP',
      status: 'pending',
    },
  })
  await prisma.invoice.create({
    data: {
      id: 'uv2353',
      customerName: 'Anita Wainwright',
      due: new Date('12 Nov 2021'),
      totalAmount: 3102.04,
      currency: 'GBP',
      status: 'draft',
    },
  })

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
