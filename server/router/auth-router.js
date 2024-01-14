const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const { loginSchema, singUpSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-Middleware");

router.route("/").get(authcontrollers.home);
router
	.route("/register")
	.post(validate(singUpSchema), authcontrollers.register);
router.route("/login").post(validate(loginSchema), authcontrollers.login);
router.route("/user").get(authMiddleware, authcontrollers.user);

module.exports = router;
