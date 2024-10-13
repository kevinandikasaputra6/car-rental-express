const Joi = require("joi");

const express = require("express");
const router = express.Router();

const BaseController = require("../base");
const OrdersModel = require("../../models/orders");
const CarModel = require("../../models/cars");

const { authorize, checkRole } = require("../../middlewares/authorization");

const orders = new OrdersModel();
const cars = new CarModel(); // mengambil data mobil

const orderSchema = Joi.object({
  cars_id: Joi.number().required(),
  start_time: Joi.date().required(),
  finish_time: Joi.date().required(),
  is_driver: Joi.boolean().required(),
});

class OrdersController extends BaseController {
  constructor(model) {
    super(model);
    this.model = orders;
    this.router = router;
    this.router.get("/", this.getAll);
    this.router.post(
      "/",
      this.validation(orderSchema),
      authorize,
      checkRole(["admin"]),
      this.create
    );
    // this.router.get("/:id", this.get);
    // this.router.put("/:id", this.validation(orderSchema), this.update);
    // this.router.delete("/:id", this.delete);
  }

  create = async (req, res, next) => {
    // jika create sama dengan yang di basemodel akan di override dg fungsi ini
    try {
      const getCars = await cars.getOne({
        where: {
          id: req.body.cars_id,
          is_available: true,
          is_driver: req.body.is_driver,
        },
        select: {
          price: true,
        },
      });

      if (!getCars)
        return next(new ValidationError("Car not found or is not available!"));

      const getLastOrderToday = await this.model.count({
        create_dt: {
          lte: new Date(),
        },
      });
      console.log(getLastOrderToday, new Date());
      const currentDate = new Date();
      const startTime = new Date(req.body.start_time);
      const endTime = new Date(req.body.finish_time);
      const total =
        getCars.price * ((endTime - startTime) / 1000 / 60 / 60 / 24);
      const invNumber = `INV/${currentDate.getFullYear()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${getLastOrderToday + 1}`;

      const [result, carUpdate] = await this.model.transaction([
        this.model.set({
          order_no: invNumber,
          start_time: startTime,
          finish_time: endTime,
          is_driver: req.body.is_driver,
          status: "pending",
          is_expired: false,
          create_by: req.user.fullname, // dapet data user dari req.user yang ada di file authorization
          update_at: req.user.fullname,
          total,
          cars: {
            connect: {
              id: req.body.cars_id,
            },
          },
          users: {
            connect: {
              id: req.user.id,
            },
          },
        }),
        cars.update(req.body.cars_id, { is_available: false }),
      ]);

      return res.status(200).json(
        this.apiSend({
          code: 200,
          status: "success",
          message: "Order created successfully",
          data: result,
        })
      );
    } catch (error) {
      return next(error);
    }
  };
  // orderCar = async (req, res, next) => {
  //   try {
  //     const selectedCar = await cars.getOne({
  //       where: {
  //         id: req.body.cars_id, // ambil data mobil dengan id di req.body
  //         is_available: true,
  //       },
  //     });
  //     console.log(selectedCar);

  //     if (!selectedCar) {
  //       return next(new ValidationError("Car is not available"));
  //     }

  //     const getLastOrderToday = await this.model.count({
  //       // menghitung order yang dibuat di hari ini
  //       create_dt: {
  //         lte: new Date(), // lte operator bawaan prisma
  //       },
  //     });
  //     console.log(getLastOrderToday, new Date());

  //     const start_time = new Date(req.body.start_time).getTime();
  //     const finish_time = new Date(req.body.finish_time).getTime();
  //     const diffDate = Math.abs(finish_time - start_time);
  //     const diffDays = Math.ceil(diffDate / (1000 * 60 * 60 * 24));

  //     const total = diffDays * selectedCar.price;

  //     const invoice = `INV/${new Date().getTime()}/${getLastOrderToday}`;
  //     const user = req.user;

  //     const order = await this.model.set({
  //       is_expired: false,
  //       status: "pending",
  //       start_time: new Date(req.body.start_time),
  //       finish_time: new Date(req.body.finish_time),
  //       total,
  //       order_no: invoice,
  //       create_by: user.fullname,
  //       update_at: user.fullname,
  //       cars: {
  //         connect: {
  //           id: selectedCar.id,
  //         },
  //       },
  //       users: {
  //         connect: {
  //           id: user.id, // cek data user ada atau tidak
  //         },
  //       },
  //     });

  //     if (order) {
  //       await cars.update(selectedCar.id, {
  //         is_available: false,
  //       });
  //     }

  //     return res.status(201).json(
  //       this.apiSend({
  //         code: 201,
  //         status: "success",
  //         message: "Car ordered successfully",
  //         data: order,
  //       })
  //     );
  //   } catch (err) {
  //     next(err);
  //   }
  // };
}

const ordersController = new OrdersController(orders);

module.exports = ordersController.router;
