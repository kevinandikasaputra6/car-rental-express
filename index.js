require("dotenv").config();
const express = require("express");
const http = require("http");
const routes = require("./src/routes");
const PORT = 3000;

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use(routes);

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

server.listen(PORT, () => {
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
