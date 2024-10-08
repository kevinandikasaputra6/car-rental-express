const Joi = require("joi");

const express = require("express");
const router = express.Router();

const BaseController = require("../base");
const UserModel = require("../../models/users");
const ValidationError = require("../../helpers/errors/validation");
const { encryptPassword } = require("../../helpers/bcrypt");

const users = new UserModel();

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().required(),
  avatar: Joi.string().allow(null),
  gender: Joi.string().allow(null),
  phone_number: Joi.string().required(),
  driver_license: Joi.string().required(),
  birth_date: Joi.string(),
});

class UsersController extends BaseController {
  constructor(model) {
    super(model);
    this.router = router;
    this.router.get("/", this.getAll);
    this.router.post(
      "/",
      this.validation(userSchema),
      this.checkUnique,
      this.encrypt,
      this.create
    );
    this.router.get("/:id", this.get);
    this.router.put(
      "/:id",
      this.validation(userSchema),
      this.checkUnique,
      this.update
    );
    this.router.delete("/:id", this.delete);
  }

  checkUnique = async (req, res, next) => {
    const checkUnique = await this.model.getOne({
      where: {
        OR: [
          { email: req.body.email },
          { phone_number: req.body.phone_number },
        ],
      },
      select: {
        email: true,
        phone_number: true,
      },
    });

    if (checkUnique)
      return next(new ValidationError("email or phone number already exist"));

    next();
  };

  encrypt = async (req, res, next) => {
    const encryptedPass = await encryptPassword(req.body.password);
    req.body.password = encryptedPass;

    next();
  };
}

const usersController = new UsersController(users);

module.exports = usersController.router;
