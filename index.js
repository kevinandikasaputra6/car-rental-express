require("dotenv").config(); // npm install dotenv
const express = require("express"); // npm install express
const app = express(); // deklarasi fungsi express
const path = require("path");
// const http = require("http"); // tinggal panggil
const cors = require("cors");
const routes = require("./src/routes");
const errorHandler = require("./src/middlewares/errorHandler");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./openapi.json");

const { PORT = 3000 } = process.env;
// const routes = require("./src/routes");

// const server = http.createServer(app); // untuk buat backend server

require("./src/helpers/errors");

app.use(cors());
app.use(express.json()); // buat body saat post/put berbentuk json

app.use("/api/v1", routes);

app.use("/public", express.static(path.resolve(__dirname, "public")));

app.get("/", async (req, res) => {
  res.status(200).send("Car Rental API");
});

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// require("./src/routes")(app);

// app.use(routes); // app.use fungsi express untuk

app.use((req, res) => {
  res.status(404).send("Sorry, page not found!");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.get("/", (req, res) => {
//   res.status(200).send("KEVIN GANTENG");
// });

// app.get("/about", (req, res) => {
//   res.status(200).send("KEVIN KEREN");
// });

// app.post("/register", (req, res) => {
//   console.log(req.body);
//   res.status(200).send("register succes");
// });

// app.get("/cars", async (req, res) => {
//   const { rows } = await client.query("SELECT * FROM cars");
//   res.status(200).json(rows);
// });

// app.post("/cars", async (req, res) => {
//   const {
//     manufacture,
//     type,
//     license_number,
//     seat,
//     baggage,
//     transmision,
//     year,
//     name,
//     description,
//     is_driver,
//     img,
//     price,
//     update_dt,
//     create_by,
//     update_at,
//   } = req.body;
//   try {
//     const result = await client.query(
//       `insert into cars(
// 	"manufacture" ,
// 	"type",
// 	"license_number",
// 	"seat" ,
// 	"baggage" ,
// 	"transmision" ,
// 	"year",
// 	"name",
// 	"description",
// 	"is_driver" ,
// 	"img" ,
// 	"price" ,
// 	"update_dt" ,
// 	"create_by" ,
// 	"update_at"
// ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *`,
//       [
//         manufacture,
//         type,
//         license_number,
//         seat,
//         baggage,
//         transmision,
//         year,
//         name,
//         description,
//         is_driver,
//         img,
//         price,
//         update_dt,
//         create_by,
//         update_at,
//       ]
//     );
//     console.log(result);
//     res.status(201).json(result.rows[0]);
//     console.log(req.body);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error creating car");
//   }
// });

// app.put("/cars", async (req, res) => {
//   const {
//     id,
//     manufacture,
//     type,
//     license_number,
//     seat,
//     baggage,
//     transmision,
//     year,
//     name,
//     description,
//     is_driver,
//     img,
//     price,
//     update_dt,
//     create_by,
//     update_at,
//   } = req.body;
//   try {
//     const result = await client.query(
//       `UPDATE cars SET
//     "manufacture" = $1,
//     "type" = $2,
//     "license_number" = $3,
//     "seat" = $4,
//     "baggage" = $5,
//     "transmision" = $6,
//     "year" = $7,
//     "name" = $8,
//     "description" = $9,
//     "is_driver" = $10,
//     "img" = $11,
//     "price" = $12,
//     "update_dt" = $13,
//     "create_by" = $14,
//     "update_at" = $15
//     WHERE id = $16 returning *`,
//       [
//         manufacture,
//         type,
//         license_number,
//         seat,
//         baggage,
//         transmision,
//         year,
//         name,
//         description,
//         is_driver,
//         img,
//         price,
//         update_dt,
//         create_by,
//         update_at,
//         id,
//       ]
//     );
//     console.log(result);
//     res.status(201).json(result.rows[0]);
//     console.log(req.body);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error creating car");
//   }
// });

// app.delete("/cars", async (req, res) => {
//   const { id } = req.body;
//   try {
//     const result = await client.query(
//       `DELETE FROM cars WHERE id = $1 returning *`,
//       [id]
//     );
//     console.log(result);
//     res.status(201).json(result.rows[0]);
//     console.log(req.body);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error creating car");
//   }
// });

// app.get("/districts", async (req, res) => {
//   const { rows } = await client.query("SELECT * FROM districts");
//   res.status(200).json(rows);
// });

// app.get("/orders", async (req, res) => {
//   const data = await client.query("SELECT * FROM orders");
//   console.log(data);
//   res.status(200).json(data.rows);
// });

// app.get("/users", async (req, res) => {
//   client.query("SELECT * FROM users", (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     res.status(200).json(data.rows);
//   });
// });
