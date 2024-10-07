const bcrypt = require("bcryptjs");
const salt = 10;

async function encryptPassword(password) {
  const result = await bcrypt.hash(password, bcrypt.genSaltSync(salt));
  return result;
}

async function checkPassword(password, encryptedPassword) {
  const result = await bcrypt.compare(password, encryptedPassword);
  return result;
}

module.exports = {
  encryptPassword,
  checkPassword,
};
