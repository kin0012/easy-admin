import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

async function main() {
  await prisma.role.createMany({
    data: [{ name: "Admin" }, { name: "User" }],
    skipDuplicates: true,
  });

  const role = await prisma.role.findFirst({
    where: {
      name: "Admin",
    },
  });

  let users: Prisma.UserCreateInput[] = [
    {
      email: "dwjhope87@gmail.com",
      name: "Administrator",
      password: "$2b$10$hww.7veLG7CH/4WM6Hgbm.F1HV39TvmgeyhDwjPXkuSgxgkXQMnRW",
      roles: { connect: { id: role?.id } },
    },
  ];

  let resourcesRoot: Prisma.ResourceCreateInput[] = [
    {
      name: "Dashboard",
      key: "dashboard",
      link: "/dashboard",
      roles: { connect: { id: role?.id } },
    },
    {
      name: "System Management",
      key: "system",
      roles: { connect: { id: role?.id } },
    },
  ];

  await Promise.all([
    users.map(async (user) => {
      await prisma.user.upsert({
        where: {
          email: user.email || undefined,
        },
        update: {},
        create: user,
      });
    }),
    resourcesRoot.map(async (resourceRoot) => {
      await prisma.resource.upsert({
        where: {
          key: resourceRoot.key,
        },
        update: {},
        create: resourceRoot,
      });
    }),
  ]);

  const resource = await prisma.resource.findUnique({
    where: {
      key: "system",
    },
  });

  let resourcesChildren: Prisma.ResourceCreateInput[] = [
    {
      name: "Menus",
      key: "system.menus",
      link: "/dashboard/menus",
      parent: { connect: { id: resource?.id } },
      roles: { connect: { id: role?.id } },
    },
    {
      name: "Users",
      key: "system.users",
      link:"/dashboard/users",
      parent: { connect: { id: resource?.id } },
      roles: { connect: { id: role?.id } },
    },
  ];

  resourcesChildren.map(async (resourceChildren) => {
    await prisma.resource.upsert({
      where: {
        key: resourceChildren.key,
      },
      update: {},
      create: resourceChildren,
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
