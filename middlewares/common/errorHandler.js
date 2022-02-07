/**
 * External Dependencies
 */
const res = require('express/lib/response');
const createError = require('http-errors');

/**
 * Module Scaffolding
 */
const errorHandler = {};
/**
 * 404 Not Found Handler
 */
errorHandler.notFoundHandler = (request, response, next) => {
    next(createError(404, 'Your requested content was not found'));
};

/**
 *  Default Error Handlers
 */
errorHandler.genericError = (error, request, response, next) => {
    response.locals.error =
        process.env.NODE_ENV === 'development' ? error : { message: error.message };
    response.status(error.status || 500);

    if (response.locals.html) {
        response.render('error', {
            title: 'Error Page',
        });
    } else {
        response.json(response.locals.error);
    }
};

/**
 * Export Module
 */
module.exports = errorHandler;
