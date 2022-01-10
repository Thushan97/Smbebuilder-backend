const db = require('../utils/db');

const getTemplates = async (plan_type) => {
    return db.queryExecutor("SELECT id, name, location FROM template WHERE plan_type = ?", [plan_type]);
}

module.exports = { getTemplates };