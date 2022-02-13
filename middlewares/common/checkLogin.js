/**
 * External Import
 */
const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (cookies) {
        try {
            const token = cookies[process.env.COOKIE_NAME];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // pass user info to response locals
            if (res.locals.html) {
                res.locals.loggedInUser = decoded;
            }
            next();
        } catch (err) {
            if (res.locals.html) {
                res.redirect('/');
            } else {
                res.status(500).json({
                    errors: {
                        common: {
                            msg: 'Authentication failure!',
                        },
                    },
                });
            }
        }
    } else if (res.locals.html) {
        res.redirect('/');
    } else {
        res.status(401).json({
            error: 'Authetication failure!',
        });
    }
};

const isLogin = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (!cookies) {
        next();
    } else {
        res.redirect('/inbox');
    }
};
/**
 * Export Module
 */
module.exports = { checkLogin, isLogin };
