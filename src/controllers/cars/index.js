// // const pool = require("../../config/db");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// class Cars {
//   async getCars(req, res) {
//     try {
//       const cars = await prisma.cars.findMany({
//         select: {
//           id: true,
//           name: true,
//           img: true,
//           manufacture: true,
//           type: true,
//           price: true,
//           year: true,
//         },
//       });
//       // pool.query("SELECT id, manufacture, name, year, type, price, img FROM cars");
//       res.status(200).json(cars);
//       console.log(cars);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Error getting cars");
//     }
//   }

//   async getCarById(req, res) {
//     const { id } = req.params;
//     try {
//       const cars = await prisma.cars.findUnique({
//         where: {
//           id: Number(id),
//         },
//       });
//       if (!cars) {
//         return res.status(404).send("Car not found");
//       }
//       res.status(200).json(cars);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Error getting cars");
//     }
//   }

//   // async getCarById(req, res) {
//   //   const { id } = req.params;
//   //   try {
//   //     const { rows } = await pool.query("SELECT * FROM cars where id=$1", [id]);
//   //     if (rows.length === 0) {
//   //       return res.status(404).send("Car not found");
//   //     }
//   //     res.status(200).json(rows[0]);
//   //   } catch (err) {
//   //     console.error(err);
//   //     res.status(500).send("Error getting cars");
//   //   }
//   // }

//   async createCar(req, res) {
//     const {
//       manufacture,
//       name,
//       year,
//       type,
//       price,
//       img,
//       license_number,
//       seat,
//       baggage,
//       transmision,
//       description,
//       is_driver,
//     } = req.body;
//     try {
//       const cars = await prisma.cars.create({
//         data: {
//           manufacture,
//           name,
//           year,
//           type,
//           price,
//           img,
//           license_number,
//           seat,
//           baggage,
//           transmision,
//           description,
//           is_driver,
//         },
//       });
//       res.status(201).json({ message: "Car created successfully", data: cars });
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Error creating car");
//     }
//   }

//   async updateCar(req, res) {
//     const { id } = req.params;
//     try {
//       const cars = await prisma.cars.update({
//         where: {
//           id: Number(id),
//         },
//         data: req.body,
//       });
//       res.status(200).json({ message: "Car updated successfully", data: cars });
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Error updating car");
//     }
//   }

//   async deleteCar(req, res) {
//     const { id } = req.params;
//     try {
//       const cars = await prisma.cars.delete({
//         where: {
//           id: Number(id),
//         },
//       });
//       res.status(200).json({ message: "Car deleted successfully", data: cars });
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Error deleting car");
//     }
//   }

//   // async createCar(req, res) {
//   //   const {
//   //     manufacture,
//   //     name,
//   //     year,
//   //     type,
//   //     price,
//   //     img,
//   //     license_number,
//   //     seat,
//   //     baggage,
//   //     transmision,
//   //     description,
//   //     is_driver,
//   //   } = req.body;
//   //   try {
//   //     const { rows } = await pool.query(
//   //       "INSERT INTO cars (manufacture, name, year, type, price, img, license_number, seat, baggage, transmision, description, is_driver) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
//   //       [
//   //         manufacture,
//   //         name,
//   //         year,
//   //         type,
//   //         price,
//   //         img,
//   //         license_number,
//   //         seat,
//   //         baggage,
//   //         transmision,
//   //         description,
//   //         is_driver,
//   //       ]
//   //     );
//   //     res.status(201).json(rows[0]);
//   //   } catch (err) {
//   //     console.error(err);
//   //     res.status(500).send("Error creating car");
//   //   }
//   // }

//   // async updateCar(req, res) {
//   //   const { id } = req.params;
//   //   const {
//   //     manufacture,
//   //     name,
//   //     year,
//   //     type,
//   //     price,
//   //     img,
//   //     license_number,
//   //     seat,
//   //     baggage,
//   //     transmision,
//   //     description,
//   //     is_driver,
//   //   } = req.body;
//   //   try {
//   //     const { rows } = await pool.query(
//   //       "UPDATE cars SET manufacture = $1, name = $2, year = $3, type = $4, price = $5, img = $6, license_number = $7, seat = $8, baggage = $9, transmision = $10, description = $11, is_driver = $12 WHERE id = $13 RETURNING *",
//   //       [
//   //         manufacture,
//   //         name,
//   //         year,
//   //         type,
//   //         price,
//   //         img,
//   //         license_number,
//   //         seat,
//   //         baggage,
//   //         transmision,
//   //         description,
//   //         is_driver,
//   //         id,
//   //       ]
//   //     );
//   //     res.status(200).json(rows[0]);
//   //   } catch (err) {
//   //     console.error(err);
//   //     res.status(500).send("Error updating car");
//   //   }
//   // }

//   // async deleteCar(req, res) {
//   //   const { id } = req.params;
//   //   try {
//   //     const cars = await pool.query("DELETE FROM cars WHERE id = $1 ", [id]);
//   //     if (cars.rowCount === 0) {
//   //       return res.status(404).send("Car not found");
//   //     }
//   //     res.status(200).send("Deleted Succes");
//   //   } catch (err) {
//   //     console.error(err);
//   //     res.status(500).send("Error deleting car");
//   //   }
//   // }
// }

// module.exports = new Cars();

const Joi = require("joi");

const BaseController = require("../base");
const CarModel = require("../../models/cars");
const express = require("express");
const { authorize, checkRole } = require("../../middlewares/authorization");
const { memory } = require("../../middlewares/upload");
var router = express.Router();

const cars = new CarModel();

const carSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  type: Joi.string(),
  manufacture: Joi.string().required(),
  is_driver: Joi.boolean().required(),
  img: Joi.string().uri().allow(null),
  description: Joi.string().allow(null),
  is_available: Joi.boolean(),
  license_number: Joi.string(),
  seat: Joi.number().min(2),
  baggage: Joi.number(),
  transmision: Joi.string(),
  year: Joi.string(),
});

class CarsController extends BaseController {
  constructor(model) {
    super(model);
    this.searchField = ["name", "type", "manufacture", "year", "name"];
    router.get("/", this.handleFilter, this.getAll);
    router.post(
      "/",
      this.validation(carSchema),
      authorize,
      checkRole(["admin"]),
      this.create
    );
    router.get("/export", this.export("cars export"));
    router.post("/import", memory.single("file"), this.import);
    router.get("/:id", this.get);
    router.put(
      "/:id",
      this.validation(carSchema),
      authorize,
      checkRole(["admin"]),
      this.update
    );
    router.delete("/:id", this.delete);
  }

  // method ini digunakan untuk menghandle filter pencarian berdasarkan field
  // yang di definisikan di dalam array searchField
  // misalnya kita ingin mencari mobil berdasarkan nama, type, dan tahun
  // maka kita dapat mengirimkan parameter query seperti ini
  // ?search=avanza&type=sedan&yearMin=2015
  // maka filter akan menghasilkan array seperti ini
  // [{type: 'sedan'}, {year: {gte: 2015}}]
  // dan di gabung dengan search akan menghasilkan object seperti ini
  //  where: {
  //     OR: [ // search menggunakan OR
  //       name: {
  //         contains: 'sedan',
  //         mode: 'insensitive'
  //       }
  //     ],
  //     AND: [{ // filter menggunakan AND
  //       year: {
  //         gte: 2015
  //       }
  //     }]
  //  }
  // yang akan digunakan sebagai parameter where di dalam prisma client
  handleFilter = (req, res, next) => {
    let filter = [];
    console.log(req.query);
    if (req.query.manufacture) {
      filter.push({ manufacture: req.query.manufacture });
    }
    if (req.query.type) {
      filter.push({ type: req.query.type });
    }
    if (req.query.name) {
      filter.push({ name: req.query.name });
    }
    if (req.query.yearMin) {
      filter.push({ year: { gte: req.query.yearMin } });
    }
    if (req.query.yearMax) {
      filter.push({ year: { lte: req.query.yearMin } });
    }
    if (req.query.priceMin) {
      filter.push({ price: { gte: req.query.priceMin } });
    }
    if (req.query.priceMax) {
      filter.push({ price: { lte: req.query.priceMax } });
    }

    if (filter.length) this.filter = filter;

    next();
  };
}

new CarsController(cars);

module.exports = router;
