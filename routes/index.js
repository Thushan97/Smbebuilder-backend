const express = require("express");
const router = express.Router();
const errorHandler = require("../utils/errorHandler");

router.use("/auth", require("./auth"));
router.use("/project", require("./project"));
router.use("/plan", require("./plan"));
router.use('/templates', require("./template"));

router.use(errorHandler);
module.exports = router;
