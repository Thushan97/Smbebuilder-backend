const express = require("express");
const router = express.Router();
const errorHandler = require("../utils/errorHandler");

router.use("/auth", require("./auth"));

router.use(errorHandler);
module.exports = router;
