const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// abstract class
class BaseModel {
  constructor(model) {
    this.model = prisma[model];
  }

  get = async ({ where, include, q = {} }) => {
    const { sortBy = "created_dt", sort = "desc", page = 1, limit = 10 } = q;
    const query = {
      select: this.select,
      where,
      include,
      orderBy: {
        [sortBy]: sort,
      },
      skip: (page - 1) * limit,
      take: limit,
    };

    const [resource, count] = await prisma.$transaction([
      this.model.findMany(query),
      this.model.count(query),
    ]);

    return { resources: resource, count };
  };

  getOne = async (query) => {
    return this.model.findUnique(query);
  };

  set = async (data) => {
    return this.model.create({ data });
  };

  update = async (id, data) => {
    return this.model.update({ where: { id }, data });
  };

  delete = async (id) => {
    return this.model.delete({ where: { id } });
  };

  count = async () => {
    return this.model.count({
      where: this.where,
    });
  };
}

module.exports = BaseModel;
