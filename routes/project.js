const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { ensureAuthenticated } = require("../middlewares/auth");

router.post("/createProject", ensureAuthenticated, projectController.createProject);
router.post("/updateProject/:id", ensureAuthenticated, projectController.updateProject);
router.post("/delete/:id",  ensureAuthenticated, projectController.deleteProject);
router.get("/allProjects", ensureAuthenticated, projectController.getAllProjects);
router.get("/singleProject/:id", ensureAuthenticated, projectController.singleProject);

module.exports = router;