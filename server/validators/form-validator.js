const { z } = require("zod");

// creating an object schema
const contactSchema = z.object({
	username: z
		.string({ required_error: "Name is required" })
		.trim()
		.min(3, { message: "Name must be at lest of 3 chars. " })
		.max(255, { message: "Name must not be more then 255 characters" }),
	email: z
		.string({ required_error: "Email is required" })
		.trim()
		.email({ message: "Invalid email address" })
		.min(3, { message: "Email must be at lest of 3 chars. " })
		.max(255, { message: "Email must not be more then 255 characters" }),
	message: z
		.string({ required_error: "Message is required" })
		.trim()
		.min(10, { message: "Message must be at lest of 10 chars. " })
		.max(1000, { message: "Message must not be more then 1000 characters" }),
});

module.exports = contactSchema;
