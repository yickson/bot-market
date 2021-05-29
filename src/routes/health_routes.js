const express = require('express');
const healthController = require('../controllers/health_controller');
const router = express.Router();

router.get('/test', healthController.getHealth);

module.exports = router;