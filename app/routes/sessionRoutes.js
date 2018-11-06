'use strict';
module.exports = function (app) {
    /* A route belongs to 1 function of any controller, use the appropiate one */
    var user = require('../controllers/userController');
    var session = require('../controllers/sessionController');
    // Session routes of the application
    app.route('/login')
        .get(session.login)
        .post(session.login);

    app.route('/logout')
        .get(session.logout)
}