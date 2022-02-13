/**
 * External import
 */
const express = require('express');
/**
 * Internal import
 */
const inboxController = require('../controller/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { checkLogin } = require('../middlewares/common/checkLogin');
/**
 * Inbox Router
 */
const router = express.Router();

/**
 * Set Page Title
 */
const pageTitle = 'Inbox';
/**
 * Get inbox with get method
 */
router.get('/', decorateHtmlResponse.setTitle(pageTitle), checkLogin, inboxController.getInbox);
/**
 * Export Module
 */
module.exports = router;
