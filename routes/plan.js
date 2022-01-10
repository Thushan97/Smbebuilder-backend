const express = require('express');
const router = express.Router();
const { ensureAuthenticated} = require('../middlewares/auth');
const planController = require('../controllers/planController');

// router.post("/createPlan", ensureAuthenticated, planController.setPlans);

module.exports = router;