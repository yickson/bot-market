const express = require('express');
const orderController = require('../controllers/order_controller');
const router = express.Router();

router.post('/create', orderController.create);
router.post('/cancel', orderController.cancel);
router.post('/get', orderController.get);
router.post('/getExec', orderController.getExec);
router.post('/status', orderController.getStatus);

module.exports = router;