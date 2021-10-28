const db = require("../utils/db");

const createNewProject = async (data) => {
    const {
      userId,
      name,
      created,
      lastModified
    } = data;
    await db.queryExecutor(
      "INSERT INTO project (name, created, last_modified, user_id) VALUES (?, ?, ?, ?)",
      [
        name,
        created,
        lastModified,
        userId
      ]
    );

};

const allProject = async (id) =>{
    return db.queryExecutor("SELECT * FROM project WHERE user_id = ? ", [id])
}

const getProject = async(data) =>{
    const { projectId, userId } = data;

    return db.queryExecutor("SELECT * FROM project WHERE id = ? && user_id = ?", [projectId, userId])
}

const getProjectCount = async(id) => {
    return db.queryExecutor("COUNT(*) project_count FROM project WHERE user_id = ?", [id])
}

const updateCurrentProject = async (data) => {
    const { id, name, lastModified } = data;

    await db.queryExecutor("UPDATE project SET name = ? , last_modified = ?  WHERE id = ?", [
        name,
        lastModified,
        id,
    ]);
};

const deleteCurrentProject = async(id) => {
    await db.queryExecutor("DELETE FROM project WHERE id = ?", [id])
}


module.exports = {
    createNewProject,
    updateCurrentProject,
    deleteCurrentProject,
    allProject,
    getProject,
    getProjectCount,
  };