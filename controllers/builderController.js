const { issueFileJWT } = require("../utils/utils");
const { createNewProject, getProject } = require("../models/project");
const path = require("path");
const fs = require("fs");

// const userId = 21;

const getFile = (req, res) => {
	//TODO:getfrom bucket
	res.sendFile(path.join(__dirname, "..", "/bucket/" + req.userFile.qbxLocation + ".qbx"));
};

const saveFile = (req, res) => {
	//TODO:save to bucket, add multer
	try {
		fs.writeFileSync("bucket/" + req.userFile.qbxLocation + ".qbx", req.file.buffer, "base64");
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
};

const getFileAccessToken = async (req, res) => {
console.log(`req.user`, req.user)
	try {
		const project = await getProject({ projectId: parseInt(req.params.id), userId: req.user.id });
		// const project = await getProject({ projectId: req.params.id, userId: req.user.id });
		if (project[0]) {
			const token = issueFileJWT({
				id: project[0].uId,
				projectId: project[0].id,
				qbxLocation: project[0].qbxLocation,
			});
			console.log(`token`, token)
			res.status(201).json({ status: true, msg: "Success", ...token });
		} else {
			return res.sendStatus(500);
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const createNewFile = async (req, res) => {
	// const fileId = req.params.id;
	//TODO:add to dabase,crete empty file
	//TODO:add userid
	const uid = 21;

	const { projectName } = req.body;
	const date = new Date();
	try {
		const result = await createNewProject({
			uId: uid,
			name: projectName,
			created: new Date(),
			last_modified: new Date(),
			qbxLocation: date.getTime().toString() + uid.toString(),
		});
		fs.writeFileSync("bucket/" + date.getTime().toString() + uid.toString() + ".qbx", "", "base64");
		const token = issueFileJWT({
			id: userId,
			projectId: result,
			qbxLocation: date.getTime().toString() + uid.toString(),
		});
		res.status(201).send(token);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const main = (req, res) => {
	return res.render("index.html");
};

module.exports = { getFile, main, getFileAccessToken, createNewFile, saveFile };
