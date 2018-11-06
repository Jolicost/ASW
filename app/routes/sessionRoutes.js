'use strict';



module.exports = function (app, passport) {
    /* A route belongs to 1 function of any controller, use the appropiate one */
    var user = require('../controllers/userController');
    var session = require('../controllers/sessionController');
    // Session routes of the application
    app.route('/login')
        .get(session.login)
        .post(session.login);

    app.route('/logout')
        .get(session.logout)


    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));
}