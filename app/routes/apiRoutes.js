'use strict';
module.exports = function(app) {
    var contribution = require('../controllers/api/apiContributionController');
    var user = require('../controllers/api/apiUserController');

    // Contribution API Routes
    app.route('/api/contributions')
            .get(contribution.list);

    app.route('/api/users')
            .get(user.list);

}