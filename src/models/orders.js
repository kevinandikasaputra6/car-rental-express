const BaseModel = require("./index");

class OrdersModel extends BaseModel {
  constructor() {
    super("orders");
    this.select = {
      id: true,
      order_no: true,
      users: {
        select: {
          fullname: true,
        },
      },
      cars: {
        select: {
          name: true,
        },
      },
      status: true,
    };
  }
}

module.exports = OrdersModel;
