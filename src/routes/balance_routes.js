const express = require('express');
const balanceController = require('../controllers/balance_controller');
const router = express.Router();

router.get('/', balanceController.get);

module.exports = router;