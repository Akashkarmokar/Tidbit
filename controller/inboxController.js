/**
 * Module Scaffolding
 */
const inboxController = {};

/**
 * Get inbox page with get method
 */
inboxController.getInbox = (request, response, next) => {
    response.render('inbox');
};
/**
 * Export Module
 */
module.exports = inboxController;
