/**
 * External Import
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
/**
 * Internal Import
 */
const User = require('../Models/People');
/**
 * Module Scaffolding
 */

const loginController = {};

loginController.getLogin = (request, response, next) => {
    response.render('index');
};

/**
 * Do Login
 */
loginController.login = async (req, res, next) => {
    try {
        // Find user -- user can login by his/her email or mobile
        const user = await User.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }],
        });
        if (user && user._id) {
            const isValidPass = await bcrypt.compare(req.body.password, user.password);
            if (isValidPass) {
                // User object to generate JWT
                const userObject = {
                    username: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: 'user',
                };
                // Generate JWT
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY,
                });

                // Set Cookie
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed: true,
                });

                // Set logged in user identifier
                res.locals.loggedInUser = userObject;
                res.render('inbox');
            } else {
                throw createError('Login failed!Please Try Again');
            }
        } else {
            throw createError('Login failed!Please Try Again');
        }
    } catch (error) {
        res.render('index', {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: error.msg,
                },
            },
        });
    }
};

loginController.logout = (req, res, next) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send('User Logged Out!');
};

module.exports = loginController;
