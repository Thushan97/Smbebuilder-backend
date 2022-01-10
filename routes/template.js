const express = require('express');
const router = express.Router();
const { ensureAuthenticated} = require('../middlewares/auth');
const templateController = require('../controllers/templateController');

router.get('/', ensureAuthenticated, templateController.getAllTemplates);

module.exports = router;