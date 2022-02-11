/**
 * Module Scaffolding
 */
const usersController = {};

usersController.getUsers = (request, response, next) => {
    response.render('users');
};

/**
 * Export Module
 */
module.exports = usersController;
