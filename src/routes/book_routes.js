const express = require('express');
const bookController = require('../controllers/books_controller');
const router = express.Router();

router.get('/', bookController.getBook);

module.exports = router;