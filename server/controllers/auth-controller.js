const User = require("../models/user-model");
const router = require("../router/auth-router");
const bcrypt = require("bcryptjs");

// Home logic
const home = async (req, res) => {
	try {
		res.status(200).send("Welcome to Home Page ! using Controller ");
	} catch (error) {
		res.status(400).send({ msg: "Page not found !" });
	}
};

const register = async (req, res) => {
	try {
		const { username, email, phone, password } = req.body;

		const userExist = await User.findOne({ email });
		if (userExist) {
			return res.status(400).json({ msg: "Email already exists" });
		}

		const userCreated = await User.create({
			username,
			email,
			phone,
			password,
		});
		res.status(201).json({
			msg: "Registration successful",
			token: await userCreated.generateToken(),
			userId: userCreated._id.toString(),
		});
	} catch (error) {
		res.status(500).send({ msg: "Internal server error !" });
	}
};

module.exports = { home, register };
