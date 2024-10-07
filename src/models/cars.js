const BaseModel = require("./index");

// inheritance
class CarModel extends BaseModel {
  constructor() {
    super("cars");
    this.select = {
      id: true,
      name: true,
      img: true,
      manufacture: true,
      type: true,
      price: true,
      year: true,
    };
  }
}

module.exports = CarModel;
