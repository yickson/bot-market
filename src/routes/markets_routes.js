const express = require('express');
const marketsController = require('../controllers/markets_controller');
const router = express.Router();

router.get('/all', marketsController.getMarkets);

module.exports = router;