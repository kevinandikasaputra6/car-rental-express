const Joi = require("joi");

const express = require("express");
const router = express.Router();

const BaseController = require("../base");
const OrdersModel = require("../../models/orders");

const orders = new OrdersModel();

const orderSchema = Joi.object({
  users_id: Joi.number().required(),
  cars_id: Joi.number().required(),
  status: Joi.string().required(),
  price: Joi.number().required(),
});

class OrdersController extends BaseController {
  constructor(model) {
    super(model);
    this.router = router;
    this.router.get("/", this.getAll);
    this.router.post("/", this.validation(orderSchema), this.create);
    this.router.get("/:id", this.get);
    this.router.put("/:id", this.validation(orderSchema), this.update);
    this.router.delete("/:id", this.delete);
  }
}

const ordersController = new OrdersController(orders);

module.exports = ordersController.router;
