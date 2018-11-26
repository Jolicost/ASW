'use strict';
module.exports = function(app) {
    var contribution = require('../controllers/api/apiContributionController');
    var user = require('../controllers/api/apiUserController');
    var middleware = require('../controllers/api/middleware');
    const mung = require('express-mung');

    // Contribution API Routes
    app.route('/api/contributions')
            .get(contribution.list);

    app.put(
    	'/api/users/:userId',
    	// Chain of middleware functions
    	[
			middleware.verifyToken,
			middleware.userWritePermissions,
			middleware.keepOnlyAbout
		],
		user.update
	);
    app.get('/api/users/:userId',
    	user.read
	);
	
	app.put('/api/contributions/:contributionId/vote', 
		[
			middleware.verifyToken,
		], 
		contribution.vote);
	
	app.put('/api/contributions/:contributionId/unvote', 
		[
			middleware.verifyToken,
		], 
		contribution.unvote);
	
	app.get('/api/contributions/:id', contribution.readContribution);

	app.post('/api/contributions', 
		[
			middleware.verifyToken,
			middleware.obtainUser
		], 
		contribution.create);

	app.post('/api/contributions/:contributionId/comment',
		[
			middleware.verifyToken,
			middleware.obtainUser
		],
		contribution.comment);
}