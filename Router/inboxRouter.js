/**
 * External import
 */
const express = require('express');
/**
 * Internal import
 */
const inboxController = require('../controller/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
/**
 * Inbox Router
 */
const router = express.Router();

/**
 * Get inbox with get method
 */
router.get('/', decorateHtmlResponse.setTitle('Inbox'), inboxController.getInbox);
/**
 * Export Module
 */
module.exports = router;
