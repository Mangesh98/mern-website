const adminMiddleware = async (req, res, next) => {
	const user = await req.user;
	try {
		if (user.isAdmin) {
			next();
		} else {
			return res
				.status(401)
				.json({ message: "Unauthorized HTTP, Not valid User" });
		}
	} catch (error) {
		return res
			.status(401)
			.json({ message: "Unauthorized HTTP, Not valid User" });
	}
};
module.exports = adminMiddleware;
