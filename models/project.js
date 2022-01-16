const db = require("../utils/db");

const createNewProject = async (data) => {
	const { uId, name, created, last_modified, qbxLocation } = data;
	var res = await db.queryExecutor(
		"INSERT INTO project ( name, created, last_modified, uId, qbxLocation) VALUES (?, ?, ?, ?,?)",
		[name, created, last_modified, uId, qbxLocation]
	);
	return res["insertId"];
};

const allProject = async (id) => {
	return db.queryExecutor("SELECT * FROM project WHERE uId = ? ", [id]);
};

const getProject = async (data) => {
	const { projectId, userId } = data;
	console.log(`userId`, userId)
	return db.queryExecutor("SELECT * FROM project WHERE id = ? && uId = ?", [projectId, userId]);
};

const getProjectCount = async (id) => {
	return db.queryExecutor("SELECT COUNT(*) project_count FROM project WHERE uId = ?", [id]);
};

const getUserProjectByName = async (data) => {
	const { userId, projectName } = data;
	return db.queryExecutor("SELECT name FROM project WHERE uId = ? AND name = ?", [userId, projectName]);
};

const updateCurrentProject = async (data) => {
	const { id, name, lastModified } = data;

	await db.queryExecutor("UPDATE project SET name = ? , last_modified = ?  WHERE id = ?", [name, lastModified, id]);
};

const deleteCurrentProject = async (id) => {
	await db.queryExecutor("DELETE FROM project WHERE id = ?", [id]);
};

module.exports = {
	createNewProject,
	updateCurrentProject,
	deleteCurrentProject,
	allProject,
	getProject,
	getProjectCount,
	getUserProjectByName,
};
