'use strict';
module.exports = function(app) {
    var contribution = require('../controllers/api/apiContributionController');
    var user = require('../controllers/api/apiUserController');
    var middleware = require('../controllers/api/middleware');
    var session = require('../controllers/api/sessionController.js')
    const mung = require('express-mung');

    // Contribution API Routes
    app.get('/api/contributions',
    	[middleware.addUserIdNoValidate],
    	contribution.list
    );

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

	app.post('/api/login', [

		], session.login);

	app.post('/api/login/github', [


		], session.githubLogin);

	app.get('/api/verify', 
		[
			middleware.verifyToken,
			middleware.obtainUser
		], session.verify)
}