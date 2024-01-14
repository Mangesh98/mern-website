const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-Middleware");
const router = express.Router();

router.route("/users").get(authMiddleware, adminController.getAllUsers);
router.route("/contacts").get(authMiddleware, adminController.getAllContacts);
router
	.route("/users/delete/:id")
	.delete(authMiddleware, adminController.deleteUser);

module.exports = router;
