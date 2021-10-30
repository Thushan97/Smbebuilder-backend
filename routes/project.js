const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { ensureAuthenticated } = require("../middlewares/auth");

router.get("/open", ensureAuthenticated, projectController.openProject);

module.exports = router;
