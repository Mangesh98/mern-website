const { z } = require("zod");

const loginSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.trim()
		.email({ message: "Invalid email address" })
		.min(3, { message: "Email must be at lest of 3 chars. " })
		.max(255, { message: "Email must not be more then 255 characters" }),
	password: z
		.string({ required_error: "Password is required" })
		.trim()
		.min(7, { message: "Password must be at lest of 7 chars. " })
		.max(1024, { message: "Password must not be more then 1024 characters" }),
});
// creating an object schema
const singUpSchema = loginSchema.extend({
	username: z
		.string({ required_error: "Name is required" })
		.trim()
		.min(3, { message: "Name must be at lest of 3 chars. " })
		.max(255, { message: "Name must not be more then 255 characters" }),
	phone: z
		.string({ required_error: "Phone is required" })
		.trim()
		.min(10, { message: "Phone must be at lest of 10 chars. " })
		.max(20, { message: "Phone must not be more then 20 characters" }),
});

module.exports = { singUpSchema, loginSchema };
