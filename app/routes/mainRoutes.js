'use strict';
module.exports = function(app) {
    var contribution = require('../controllers/contributionController');
    var user = require('../controllers/userController');

    // contribution Routes
    app.route('/').get((req, res) => res.render('pages/index'));
}