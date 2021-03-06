const createError = require('http-errors');
const { body, param, validationResult } = require('express-validator');

const clipboardService = require('../services/clipboard.service');
const dateUtils = require('../utils/date.utils');

exports.create = [

    body('content')
        .trim()
        .escape()
        .not().isEmpty()
        .withMessage('content may not be empty')
        .bail(),

    body('expirationTime')
        .trim()
        .escape()
        .not().isEmpty()
        .withMessage('expiration time may not be empty')
        .bail()
        .isIn(Object.keys(dateUtils.expirationTimes))
        .withMessage('expiration time is not valid')
        .bail(),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return next(createError(422, {errors: errors.array()}));
        }

        next();
    },
];

exports.view = [

    param('clipboardId')
        .trim()
        .escape()
        .not().isEmpty()
        .withMessage('clipboard id may not be empty')
        .bail()
        .custom(value => {
            return clipboardService.findById(value) !== undefined;
        })
        .withMessage('clipboard not found')
        .bail(),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return next(createError(422, {errors: errors.array()}));
        }

        next();
    },
];
