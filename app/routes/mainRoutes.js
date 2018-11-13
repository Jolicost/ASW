'use strict';
module.exports = function (app) {
    /* A route belongs to 1 function of any controller, use the appropiate one */
    var contribution = require('../controllers/contributionController');
    var user = require('../controllers/userController');
    var main = require('../controllers/mainController');

    // Main routes of the application
    app.route('/')
        .get(main.main);

    
    app.route('/newest')
        .get(main.newest);

    // Testing route for MVC example 
    app.route('/testModel')
        .get(main.main);

    app.route('/submit')
        .get(main.submit)
        .post(main.submitForm);

    app.route('/item')
        .get(main.contribution);

    app.route('/ask')
        .get(main.ask);

    app.route('/submitted')
        .get(contribution.submissions);

    app.route('/upvote')
        .get(main.upvote);

    app.route('/unvote')
        .get(main.unvote);

    app.route('/comment')
        .post(main.comment);
        
    app.route('/threads')
        .get(main.threads);
}