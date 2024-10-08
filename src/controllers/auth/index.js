const Joi = require("joi");

const express = require("express");
const router = express.Router();

const BaseController = require("../base");
const UserModel = require("../../models/users");
const { checkPassword, encryptPassword } = require("../../helpers/bcrypt");
const { createToken } = require("../../helpers/jwt");

const users = new UserModel();

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .messages({
      "string.min": `Password must be at least {#limit} characters long`,
      "string.pattern.base": `Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
    }),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

class AuthController extends BaseController {
  constructor(model) {
    super(model);
    this.router = router;
    this.router.post("/signin", this.validation(signInSchema), this.signIn);
    this.router.post(
      "/signup",
      this.validation(signUpSchema),
      this.encrypt,
      this.signUp
    );
  }

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body; // ambil email dan password

      const user = await this.model.getOne({
        where: {
          email,
        },
      }); // cari email

      if (!user) return next(new ValidationError("Invalid email or password")); // jika email tidak ditemukan

      const isMatch = await checkPassword(password, user.password);

      if (!isMatch)
        return next(new ValidationError("Invalid email or password")); // jika password tidak cocok

      const token = createToken({ id: user.id }); // buat token

      return res.status(200).json(
        this.apiSend({
          code: 200,
          status: "success",
          message: "Sign in successfully",
          data: {
            // data user
            user: {
              ...user,
              id: undefined, // undefined agar tidak ditampilkan
              password: undefined,
            },
            token, // tokennya
          },
        })
      ); // menampilkan response
    } catch (err) {
      next(new ServerError(err)); // jika ada error
    }
  };

  encrypt = async (req, res, next) => {
    const encryptedPass = await encryptPassword(req.body.password);
    req.body.password = encryptedPass;

    next();
  };

  signUp = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await this.model.getOne({
        where: {
          email,
        },
      });

      if (user) {
        return next(new ValidationError("Email already registered"));
      }

      const newUser = await this.model.set({
        email,
        password: await encryptPassword(password),
        role: "user",
      });

      return res.status(201).json(
        this.apiSend({
          code: 201,
          status: "success",
          message: "Sign up successfully",
          data: newUser,
        })
      );
    } catch (err) {
      next(new ServerError(err.message));
    }
  };
}

const authController = new AuthController(users);

module.exports = authController.router;
