/**
 * External Import
 */
const express = require('express');

/**
 * Internal Import
 */
const loginController = require('../controller/loginController');
const loginValidators = require('../middlewares/login/loginValidators');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { isLogin } = require('../middlewares/common/checkLogin');

/**
 * Login Route
 */
const router = express.Router();

/**
 * Set Page Title
 */
const pageTitle = 'LogIn';

/**
 * login page - get method
 */
router.get('/', decorateHtmlResponse.setTitle(pageTitle), isLogin, loginController.getLogin);

/**
 * Process Login
 */
router.post(
    '/',
    decorateHtmlResponse.setTitle(pageTitle),
    loginValidators.validators,
    loginValidators.validatorHandler,
    loginController.login,
);

/**
 * Logout User
 */
router.delete('/', loginController.logout);
/**
 * Export Module
 */

module.exports = router;
