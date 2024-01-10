const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;
const connectDb = async () => {
	try {
		await mongoose.connect(URI);
		console.log("Connection successful to Database");
	} catch (error) {
		console.error("Database connection failed");
		console.log(error);
		process.exit(0);
	}
};

module.exports = connectDb;
