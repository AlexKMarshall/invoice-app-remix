import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const createNewInvoice = () =>
  prisma.invoice.create({
    data: {
      id: faker.datatype.string(6),
      customerName: faker.name.findName(),
      totalAmount: faker.finance.amount(),
      currency: 'GBP',
      status: faker.helpers.arrayElement(['draft', 'pending', 'paid']),
      client: {
        create: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          address: {
            create: getNewAddress(),
          },
        },
      },
      address: {
        create: getNewAddress(),
      },
      issuedAt: faker.date.past(),
      lineItem: {
        create: {
          name: faker.commerce.product(),
          price: faker.datatype.number({ min: 1, max: 1000 }),
          quantity: faker.datatype.number(10),
        },
      },
    },
  })

const getNewClient = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  address: getNewAddress(),
})

const getNewAddress = () => ({
  lineOne: faker.address.streetAddress(),
  city: faker.address.city(),
  postcode: faker.address.zipCode(),
  country: faker.address.country(),
})

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

  await createNewInvoice()
  await createNewInvoice()
  await createNewInvoice()

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
