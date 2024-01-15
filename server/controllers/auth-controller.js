const User = require("../models/user-model");
const router = require("../router/auth-router");
const bcrypt = require("bcryptjs");

// Home logic
const home = async (req, res) => {
	try {
		res.status(200).send("Welcome to Home Page ! using Controller ");
	} catch (error) {
		res.status(400).send({ message: "Page not found !" });
	}
};

// User Register logic
const register = async (req, res) => {
	try {
		const { username, email, phone, password } = req.body;

		const userExist = await User.findOne({ email });
		if (userExist) {
			return res.status(400).json({ message: "Email already exists" });
		}

		const userCreated = await User.create({
			username,
			email,
			phone,
			password,
		});
		res.status(201).json({
			message: "Registration successful",
			token: await userCreated.generateToken(),
			userId: userCreated._id.toString(),
		});
	} catch (error) {
		res.status(500).send({ message: "Internal server error !" });
	}
};
// User Login logic
const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const userExist = await User.findOne({ email });
		if (!userExist) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		// const user = await bcrypt.compare(password, userExist.password);
		const user = await userExist.comparePassword(password);

		if (user) {
			res.status(200).json({
				message: "Login successful",
				token: await userExist.generateToken(),
				userId: userExist._id.toString(),
			});
		} else {
			res.status(401).json({ message: "Invalid Credentials" });
		}
	} catch (error) {
		res.status(500).send({ message: "Internal server error !", error });
	}
};

// to send user data - User Logic
const user = async (req, res) => {
	try {
		const userData = req.user;
		// console.log(userData);
		return res.status(200).json({ userData });
	} catch (error) {
		console.log(`Error from the user route ${error}`);
	}
};

module.exports = { home, register, login, user };
