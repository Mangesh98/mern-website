const express = require("express");
const router = express.Router();
const contactForm = require("../controllers/contact-controller");
const contactSchema = require("../validators/form-validator");
const formValidate = require("../middlewares/formValidate-middleware");

router.route("/contact").post(formValidate(contactSchema), contactForm);

module.exports = router;
