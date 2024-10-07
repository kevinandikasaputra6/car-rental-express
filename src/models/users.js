const BaseModel = require("./index");

class UserModel extends BaseModel {
  constructor() {
    super("users");
    this.select = {
      id: true,
      fullname: true,
      email: true,
      address: true,
      password: true,
      role: true,
      avatar: true,
      gender: true,
      phone_number: true,
    };
  }
}

module.exports = UserModel;
