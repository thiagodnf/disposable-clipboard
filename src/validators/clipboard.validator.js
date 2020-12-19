const createError = require('http-errors');
const { body, param, validationResult } = require('express-validator');

const dateUtils = require('../utils/date.utils');

exports.create = [

    body('content')
        .trim()
        .escape()
        .not().isEmpty()
        .withMessage('content may not be empty')
        .bail(),

    body('expirationDate')
        .trim()
        .escape()
        .not().isEmpty()
        .withMessage('expiration date may not be empty')
        .bail()
        .isIn(Object.keys(dateUtils.expirationDates))
        .withMessage('expiration date is not valid')
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
        .withMessage('content may not be empty')
        .bail()
        .isLength({ min: 10})
        ,

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return next(createError(422, {errors: errors.array()}));
        }

        next();
    },
]
