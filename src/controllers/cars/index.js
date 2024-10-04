const pool = require("../../config/db");

class Cars {
  async getCars(req, res) {
    try {
      const { rows } = await pool.query(
        "SELECT id, manufacture, name, year, type, price, img FROM cars"
      );
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error getting cars");
    }
  }

  async getCarById(req, res) {
    const { id } = req.params;
    try {
      const { rows } = await pool.query("SELECT * FROM cars where id=$1", [id]);
      if (rows.length === 0) {
        return res.status(404).send("Car not found");
      }
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error getting cars");
    }
  }

  async createCar(req, res) {
    const {
      manufacture,
      name,
      year,
      type,
      price,
      img,
      license_number,
      seat,
      baggage,
      transmision,
      description,
      is_driver,
    } = req.body;
    try {
      const { rows } = await pool.query(
        "INSERT INTO cars (manufacture, name, year, type, price, img, license_number, seat, baggage, transmision, description, is_driver) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
        [
          manufacture,
          name,
          year,
          type,
          price,
          img,
          license_number,
          seat,
          baggage,
          transmision,
          description,
          is_driver,
        ]
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating car");
    }
  }

  async updateCar(req, res) {
    const { id } = req.params;
    const {
      manufacture,
      name,
      year,
      type,
      price,
      img,
      license_number,
      seat,
      baggage,
      transmision,
      description,
      is_driver,
    } = req.body;
    try {
      const { rows } = await pool.query(
        "UPDATE cars SET manufacture = $1, name = $2, year = $3, type = $4, price = $5, img = $6, license_number = $7, seat = $8, baggage = $9, transmision = $10, description = $11, is_driver = $12 WHERE id = $13 RETURNING *",
        [
          manufacture,
          name,
          year,
          type,
          price,
          img,
          license_number,
          seat,
          baggage,
          transmision,
          description,
          is_driver,
          id,
        ]
      );
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating car");
    }
  }

  async deleteCar(req, res) {
    const { id } = req.params;
    try {
      const cars = await pool.query("DELETE FROM cars WHERE id = $1 ", [id]);
      if (cars.rowCount === 0) {
        return res.status(404).send("Car not found");
      }
      res.status(200).send("Deleted Succes");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting car");
    }
  }
}

module.exports = new Cars();
