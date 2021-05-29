const express = require('express');
const tickerController = require('../controllers/ticker_controller');
const router = express.Router();

router.post('/', tickerController.ticker);
router.get('/', tickerController.all);

module.exports = router;