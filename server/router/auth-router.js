const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const {loginSchema,singupSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

router.route("/").get(authcontrollers.home);
router
	.route("/register")
	.post(validate(singupSchema), authcontrollers.register);
router.route("/login").post(validate(loginSchema), authcontrollers.login);

module.exports = router;
