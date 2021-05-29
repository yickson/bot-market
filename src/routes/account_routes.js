const express = require('express');
const accountController = require('../controllers/account_controller');
const router = express.Router();

router.get('/', accountController.getAccount);

module.exports = router;