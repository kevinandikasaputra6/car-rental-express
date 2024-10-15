// req.user -> ambil role
// role dari req.user -> ambil data access
const accessModel = require("../models/access");
const access = new accessModel();

function rbac(menuParam, accessParam) {
  return async (req, res, next) => {
    const role_id = req.user.role_id; // ambil data user
    if (role_id === 1) return next();
    // query
    // SELECT * FROM access a JOIN menu m on a.menu_id = m.id
    // WHERE a.role_id = 1 AND grant = { [$accessParam] : true } AND m.name = $menu ($ ngambil dari parameter)

    // price = 10000 equal
    // price >= 10000 gte
    // price <= 10000 lte
    const accessByRole = await access.getOne({
      // access dari model
      where: {
        role_id: role_id,
        grant: {
          path: [accessParam],
          equals: true, // access param dari parameter
        },

        menu: {
          // include untuk koneksi dengan tabel, bisa sekaligus mencari di dua tabel
          is: {
            //
            name: menuParam,
          },
        },
      },
    });
    console.log(accessByRole);
    if (!accessByRole) return next(new ValidationError("Forbidden"));
    return next();
  };
}

module.exports = rbac;
