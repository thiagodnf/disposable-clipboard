const express = require('express');
const router = express.Router();

const clipboardValidator = require('../validators/clipboard.validator');
const clipboardController = require('../controllers/clipboard.controller');
const indexController = require('../controllers/index.controller');

router.get('/', indexController.index);

router.get('/:clipboardId', clipboardValidator.view, clipboardController.view);

module.exports = router;
