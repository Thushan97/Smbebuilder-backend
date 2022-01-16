const passport = require("passport");
const jwt = require("jsonwebtoken");

const ensureFileAuthenticated = async (req, res, next) => {
	try {
		const a = await jwt.verify(req.headers["x-auth"], process.env.TOKEN_SECRET);
		if (a) {
			req.userFile = a;
			next();
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(401);
	}
};

module.exports = {
	ensureFileAuthenticated,
};
