const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ACCESS = [
  {
    id: 1,
    visible: true,
    grant: {
      create: true,
      update: true,
      read: true,
      delete: true,
      import: true,
      export: true,
    },
    role_id: 2,
    menu_id: 1,
    create_by: "Super Duper Admin",
  },
];

async function accessSeed() {
  await prisma.access.deleteMany();
  return await prisma.access.createMany({ data: ACCESS });
}

module.exports = accessSeed;
