/**
 * Module Scaffolding
 */

const loginController = {};

loginController.getLogin = (request, response, next) => {
    response.render('index');
};
// function getLogin(request, response, next) {
//     response.render('index', {
//         title: 'Login - Tidbit',
//     });
// }

module.exports = loginController;
