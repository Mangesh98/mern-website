const Service = require("../models/service-model");

const services = async (req, res) => {
	try {
		const response = await Service.find();
		if (!response) {
			return res.status(404).json({ message: "No service found" });
		}

		return res.status(200).json({ message: response });
	} catch (error) {
		return res.status(500).json({ message: error });
		// next(error);
	}
};

module.exports = services;
