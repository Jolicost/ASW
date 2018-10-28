'use strict';
module.exports = function(app) {
    var contribution = require('../controllers/contributionController');
    var user = require('../controllers/userController');
    var main = require('../controllers/mainController');

    // contribution Routes
    app.route('/')
        .get((req, res) => res.render('pages/index'));


    app.route('/testModel')
        .get(main.main);


}