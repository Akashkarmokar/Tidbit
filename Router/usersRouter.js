/**
 * External import
 */
const express = require('express');
/**
 * Internal import
 */
const usersController = require('../controller/usersController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
/**
 * Users Router
 */
const router = express.Router();

/**
 * Get Users Page - Get Method
 */
router.get('/', decorateHtmlResponse.setTitle('Users'), usersController.getUsers);
/**
 * Export Module
 */
module.exports = router;
