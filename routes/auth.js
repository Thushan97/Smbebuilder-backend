const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { ensureAuthenticated } = require("../middlewares/auth");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/register-confirm", authController.registrationConfirm);
router.get("/user", ensureAuthenticated, authController.getUser);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
