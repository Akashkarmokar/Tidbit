/**
 * Module Scaffolding
 */
const decorateHtmlResponse = {};
/**
 *
 * @param {string} pageTitle
 */
decorateHtmlResponse.setTitle = (pageTitle) => (request, response, next) => {
    response.locals.html = true;
    response.locals.title = `${pageTitle}-${process.env.APP_NAME}`;
    next();
};
/**
 * Export Module
 */
module.exports = decorateHtmlResponse;
