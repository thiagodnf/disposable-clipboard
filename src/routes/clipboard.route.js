const express = require('express');
const router = express.Router();

const clipboardValidator = require('../validators/clipboard.validator');
const clipboardController = require('../controllers/clipboard.controller');

router.post('/create', clipboardValidator.create, clipboardController.create);

router.get('/success/:clipboardId', clipboardValidator.view, clipboardController.success);

module.exports = router;
