const { verifyToken } = require("../helpers/jwt");
const UserModel = require("../models/users");
const user = new UserModel();

async function authorize(req, res, next) {
  try {
    const bearearToken = req.headers.authorization; // ambil token, object token
    if (!bearearToken) return res.status(401).json({ message: "Unauthorized" }); // jika tidak ada token, return 401
    const token = bearearToken.split(" ")[1]; // split untuk ambil tokennya saja, bearer nya tidak

    const payload = verifyToken(token); // data user
    req.user = await user.getById(payload.id); // ambil id user di masukkan ke req.user masukkan ke middleware, agar bisa di pakai di page / fungsi lain yang membutuhkan data user, data user dapet dari payload
    next();
  } catch (err) {
    console.log(err);

    next(err);
  }
}

function checkRole(roles) {
  return (req, res, next) => {
    console.log(req.user);
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
}

module.exports = { authorize, checkRole };
