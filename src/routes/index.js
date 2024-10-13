const controllers = require("../controllers");

module.exports = function (app) {
  app.use("/api/v1/cars", controllers.cars);
  app.use("/api/v1/users", controllers.users);
  app.use("/api/v1/orders", controllers.orders);
  app.use("/api/v1/auth", controllers.auth);
  app.use("/api/v1/upload", controllers.upload);
};
