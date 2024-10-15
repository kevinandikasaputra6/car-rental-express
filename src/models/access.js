const BaseModel = require("./index");

//inheritance
class AccessModel extends BaseModel {
  constructor() {
    super("access");
    this.select = {
      id: true,
      visible: true,
      grant: true,
      role_id: true,
      menu_id: true,
    };
  }
}

module.exports = AccessModel;
