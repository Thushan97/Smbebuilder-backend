const express = require("express");
const { ensureFileAuthenticated } = require("../middlewares/fileAuth");
const { ensureAuthenticated } = require("../middlewares/auth");
const multer = require("multer");
const upload = multer({ limits: 1000000 });

const userController = require("../controllers/userController");

const router = express.Router();
const { getFile, main, getFileAccessToken, createNewFile, saveFile } = require("../controllers/builderController");

router.get("/app/:token", main);

router.get("/getFile", ensureFileAuthenticated, getFile);
router.post("/saveFile", upload.single("qbxFile"), ensureFileAuthenticated, saveFile);

router.get("/getFileAccessToken/:id", ensureAuthenticated, getFileAccessToken);
router.post("/create", ensureAuthenticated, createNewFile);

router.post("/uploadImage",  userController.uploadImage);
router.get("/getImages/:id",  userController.getImages);

module.exports = router;
