const { cars, users, auth, orders, upload } = require("../controllers");
const path = require("path");
const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger-output.json");

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use("/cars", cars);
router.use("/users", users);
router.use("/auth", auth);
router.use("/orders", orders);
router.use("/upload", upload);

module.exports = router;
