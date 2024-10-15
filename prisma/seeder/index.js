const { PrismaClient } = require("@prisma/client");

const roleSeed = require("./role");
const userSeed = require("./user");
const accessSeed = require("./access");
const menuSeed = require("./menu");

const prisma = new PrismaClient();

async function main() {
  const role = await roleSeed();
  const user = await userSeed();
  const menu = await menuSeed();
  const access = await accessSeed();
  console.log({ role, user, access, menu });
  console.log(`Database has been seeded. `);
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
