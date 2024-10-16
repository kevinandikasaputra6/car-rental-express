const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const server = require("../index");

afterAll(async () => {
  await prisma.orders.deleteMany();
  await prisma.cars.deleteMany();
  await prisma.users.deleteMany();
  await prisma.menus.deleteMany();
  await prisma.roles.deleteMany();
  await prisma.access.deleteMany();

  server.close();
  console.log("end test");
});
