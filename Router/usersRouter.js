/**
 * External import
 */
const express = require('express');
/**
 * Internal import
 */
const usersController = require('../controller/usersController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const AvaterUploader = require('../middlewares/users/avaterUpload');
const {
    addUserValidators,
    addUserValidationHandler,
} = require('../middlewares/users/userValidators');
const { checkLogin } = require('../middlewares/common/checkLogin');
/**
 * Users Router
 */
const router = express.Router();

/**
 * Get Users Page - Get Method
 */
router.get('/', decorateHtmlResponse.setTitle('Users'), checkLogin, usersController.getUsers);
/**
 * Add users - post method
 */
router.post(
    '/',
    checkLogin,
    AvaterUploader,
    addUserValidators,
    addUserValidationHandler,
    usersController.addUser,
);
router.delete('/:id', usersController.removeUser);
/**
 * Export Module
 */
module.exports = router;
