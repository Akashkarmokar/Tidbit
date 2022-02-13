/**
 * External Imports
 */
const { check, validationResult } = require('express-validator');

/**
 * Module Scaffolding
 */
const loginValidators = {};
/**
 * Validators
 */
loginValidators.validators = [
    check('username').isLength({ min: 1 }).withMessage('Email or mobile number is required'),
    check('password').isLength({ min: 1 }).withMessage('Password is required!'),
];

/**
 * Validator Handler
 */
loginValidators.validatorHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.render('index', {
            data: {
                username: req.body.username,
            },
            errors: mappedErrors,
        });
    }
};

/**
 * Export Module
 */
module.exports = loginValidators;
