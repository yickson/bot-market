const express = require('express');
const homeController = require('../controllers/home_controller');
const router = express.Router();

router.get('/', homeController.index);
router.get('/indicators', homeController.getIndicators);

module.exports = router;