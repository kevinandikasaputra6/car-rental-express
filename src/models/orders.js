const BaseModel = require("./index");

class OrdersModel extends BaseModel {
  constructor() {
    super("orders");
    this.select = {
      id: true,
      users_id: true,
      cars_id: true,
      create_dt: true,
      status: true,
    };
  }
}

module.exports = OrdersModel;
