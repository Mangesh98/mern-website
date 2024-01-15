const Contact = require("../models/contact-model");
const User = require("../models/user-model");

// User Routes

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

const getUserByID = async (req, res) => {
	try {
		const id = req.params.id;
		const findUser = await User.findOne({ _id: id }, { password: 0 });
		if (!findUser) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json(findUser);
	} catch (error) {
		next(error);
	}
};
const updateUserByID = async (req, res) => {
	try {
		const id = req.params.id;
		const { username, email, phone } = req.body;

		// console.log(username);
		const updatedUser = await User.findByIdAndUpdate(
			{ _id: id },
			{
				$set: { username: username, email: email, phone: phone },
			}
		);
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json({ message: "User Updated successfully" });
	} catch (error) {
		next(error);
		// console.log(error);
	}
};

// Contact Routes

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
const deleteContact = async (req, res) => {
	try {
		const id = req.params.id;
		// console.log(id);
		const deletedContact = await Contact.findByIdAndDelete(id);
		if (!deletedContact) {
			return res.status(404).json({ message: "Contact not found" });
		}
		return res.status(200).json({ message: "Contact deleted successfully" });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllUsers,
	deleteUser,
	getUserByID,
	updateUserByID,
	getAllContacts,
	deleteContact,
};
