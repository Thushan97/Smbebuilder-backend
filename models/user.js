const db = require("../utils/db");

const getUserById = (id) => {
  return db.queryExecutor("SELECT * FROM user WHERE id = ?", [id]);
};

const getUserByEmail = (email) => {
  return db.queryExecutor("SELECT * FROM user WHERE email = ?", [email]);
};

const createUser = async (data) => {
  const {
    email,
    name,
    password,
    reg_date,
    type,
    plan_started,
    plan_expire,
    account_state,
    confirmationCode,
  } = data;
  await db.queryExecutor(
    "INSERT INTO user (email, name, password, reg_date, type, plan_started, plan_expire, account_state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      email,
      name,
      password,
      reg_date,
      type,
      plan_started,
      plan_expire,
      account_state,
    ]
  );
  const id = await db.queryExecutor("SELECT id FROM user WHERE email = ?", [
    email,
  ]);

  return db.queryExecutor("INSERT INTO waiting_confirmation VALUES (?, ?, ?)", [
    id[0].id,
    confirmationCode,
    reg_date,
  ]);
};

const confirmeUserRegistration = async (id) => {
  await db.queryExecutor("UPDATE user SET account_state = 1 WHERE id = ?", [
    id,
  ]);
  await db.queryExecutor("DELETE FROM waiting_confirmation WHERE user_id = ?", [
    id,
  ]);
};

const setPasswordResetToken = async (data) => {
  const { userId, token, expireIn } = data;
  const oldToken = (
    await db.queryExecutor(
      "SELECT * FROM password_resetting WHERE user_id = ?",
      [userId]
    )
  )[0];
  if (oldToken) {
    await db.queryExecutor(
      "UPDATE password_resetting SET token = ? WHERE user_id = ?",
      [token, oldToken.user_id]
    );
  } else {
    await db.queryExecutor("INSERT INTO password_resetting VALUES (?, ?, ?)", [
      userId,
      token,
      expireIn,
    ]);
  }
};

const getPasswordResetToken = async (id) => {
  return await db.queryExecutor(
    "SELECT * FROM password_resetting WHERE user_id = ?",
    [id]
  );
};

const resetPassword = async (data) => {
  const { id, password } = data;
  await db.queryExecutor("UPDATE user SET password = ? WHERE id = ?", [
    password,
    id,
  ]);
  await db.queryExecutor("DELETE FROM password_resetting WHERE user_id = ?", [
    id,
  ]);
};

const changePlan = async (data) => {
  const { id, type, planStart, planEnd } = data;
  var result = await db.queryExecutor("UPDATE user SET type = ?,plan_started = ?,plan_expire = ? WHERE id = ?", [
    type,
    planEnd,
    planStart,
    id,
  ]);
  console.log(`result`, result);
  return result;
};

const addImages = async (data) => {
  const { userID, imageURL } = data;
  await db.queryExecutor(
    "INSERT INTO user_image (userID, imageID, isDelete) VALUES (?, ?, ?)",
    [
      userID,
      imageURL,
      false
    ]
  );
};


const getImages = async (userID) => {
  var out = await db.queryExecutor(
    "SELECT * FROM user_image WHERE userID = ?",//SELECT * FROM user_image WHERE userID = ?",
    [userID]
  );
  console.log(`out`, out[1]);
  return out;
};


const removeImages = async (data) => {
  const { userID, id } = data;
  await db.queryExecutor("DELETE FROM user_image WHERE userID = ? AND id = ?", [
    userID,
    id,
  ]);
};

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  confirmeUserRegistration,
  setPasswordResetToken,
  getPasswordResetToken,
  resetPassword,
  changePlan,
  addImages,
  getImages
};
