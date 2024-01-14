const Contact = require("../models/contact-model");
const User = require("../models/user-model");

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select({ password: 0 });
		if (!users || users.length == 0) {
			return res.status(400).json({ message: "No Users Found" });
		}
		return res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};
const getAllContacts = async (req, res) => {
	try {
		const contacts = await Contact.find();
		if (!contacts) {
			return res.status(400).json({ message: "No Contacts Found" });
		}
		return res.status(200).json(contacts);
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res) => {
	try {
		const id = req.params.id;
		const deleteUser = await User.findByIdAndDelete(id);
		if (!deleteUser) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		next(error);
	}
};
module.exports = { getAllUsers, getAllContacts, deleteUser };
