import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query'] })

async function main() {
  let users: Prisma.UserCreateInput[] = [
    {
      email: 'dwjhope87@gmail.com',
      name: 'Administrator',
      password: '$2b$10$hww.7veLG7CH/4WM6Hgbm.F1HV39TvmgeyhDwjPXkuSgxgkXQMnRW'
      //role: 'ADMIN',
    },
  ]

  await Promise.all(
    users.map(async (user) => {
      await prisma.user.create({
        data: user,
      })
    })
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })