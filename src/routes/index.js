const controllers = require("../controllers");

module.exports = function (app) {
  app.use("/api/v1/cars", controllers.cars);
  app.use("/api/v1/users", controllers.users);
};
