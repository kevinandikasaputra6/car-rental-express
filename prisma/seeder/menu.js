const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const MENUS = [
  {
    id: 1,
    name: "CARS",
    title: "Cars",
    icon: null,
    path: "/cars",
    is_submenu: false,
    permission: ["create", "update", "read", "delete", "import", "export"],
    create_by: "Super Duper Admin",
  },
];

async function menuSeed() {
  await prisma.menus.deleteMany();
  return await prisma.menus.createMany({ data: MENUS });
}

module.exports = menuSeed;
