const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const router = express.Router();

// Users Route
router
	.route("/users")
	.get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router
	.route("/users/:id")
	.get(authMiddleware, adminMiddleware, adminController.getUserByID);
router
	.route("/users/delete/:id")
	.delete(authMiddleware, adminMiddleware, adminController.deleteUser);
router
	.route("/users/update/:id")
	.patch(authMiddleware, adminMiddleware, adminController.updateUserByID);

// Contacts Route
router.route("/contacts").get(authMiddleware,adminMiddleware, adminController.getAllContacts);
router
	.route("/contacts/delete/:id")
	.delete(authMiddleware, adminMiddleware, adminController.deleteContact);

module.exports = router;
