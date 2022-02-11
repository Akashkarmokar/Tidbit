/**
 * External Import
 */
const express = require('express');

/**
 * Internal Import
 */
const { getLogin } = require('../controller/loginController');

const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

/**
 * Login Route
 */
const router = express.Router();

/**
 * login page with get method
 */
router.get('/', decorateHtmlResponse.setTitle('Login'), getLogin);
/**
 * Export Module
 */

module.exports = router;
