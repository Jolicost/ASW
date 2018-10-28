'use strict';
module.exports = function(app) {
    var contribution = require('../controllers/contributionController');

    // Contribution API Routes
    app.route('/contributions')
        .get(contribution.list)
        .post(contribution.create)
        .delete(contribution.deleteAll);

    app.route('/contributions/:contributionId')
        .get(contribution.read)
        .put(contribution.update)
        .delete(contribution.delete);      
}