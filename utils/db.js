const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  allowPublicKeyRetrieval: true
});

async function queryExecutor(query, values) {
  let conn;
  let result = false;
  try {
    conn = await pool.getConnection();
    result = await conn.query(query, values);
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
    return result;
  }
}

module.exports.queryExecutor = queryExecutor;
