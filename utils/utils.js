const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function validPassword(password, hash) {
	return bcrypt.compare(password, hash);
}

function genPassword(password) {
	return bcrypt.hash(password, 10);
}

function issueJWT(user) {
	const { id, name, email } = user;
	const TOKEN_SECRET = process.env.TOKEN_SECRET;
	const expiresIn = `${process.env.TOKEN_EXPIRE_TIME}d`;
	const payload = {
		id,
		name,
		email,
		iat: Date.now(),
	};

	const signedToken = jsonwebtoken.sign(payload, TOKEN_SECRET, {
		expiresIn: expiresIn,
	});

	return {
		token: signedToken,
		expires: expiresIn,
	};
}
function issueFileJWT(file) {
	const { id, projectId, qbxLocation } = file;
	const TOKEN_SECRET = process.env.TOKEN_SECRET;
	const expiresIn = `${process.env.TOKEN_EXPIRE_TIME}d`;
	const payload = {
		id,
		projectId,
		qbxLocation,
		iat: Date.now(),
	};

	const signedToken = jsonwebtoken.sign(payload, TOKEN_SECRET, {
		expiresIn: expiresIn,
	});

	return {
		token: signedToken,
		expires: expiresIn,
	};
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.issueFileJWT = issueFileJWT;
