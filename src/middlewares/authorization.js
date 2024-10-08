const { verifyToken } = require("../helpers/jwt");
const UserModel = require("../models/users");
const user = new UserModel();

async function authorize(req, res, next) {
  try {
    const bearearToken = req.header.authorization; // ambil token, object token
    const token = bearearToken.split(" ")[1]; // split untuk ambil tokennya saja, bearer nya tidak

    const payload = verifyToken(token); // data user
    req.user = await user.getById(payload.id); // ambil id user di masukkan ke req.user masukkan ke middleware
    next();
  } catch (err) {
    console.log(err);

    next(err);
  }
}

module.exports = authorize;
