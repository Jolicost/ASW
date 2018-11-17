var jwt = require('jsonwebtoken');
var config = require('../../../config/config');
var mongoose = require('mongoose');

User = mongoose.model('Users');
Contribution = mongoose.model('Contributions');
var async = require("async");


/* Function to verify that a token exists 
 * You must call this middleware function in every API request in order to authorize the user
 * POSTCONDITION: req.userId will be set to the requester user id. 
 * You can obtain the information about the requester user using such attribute on latter middleware/functions
  */
exports.verifyToken = function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });

    jwt.verify(token,config.get('server.auth.secret'), function(err, decoded) {
        if (err)
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });

        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}

/* Checks if an user has permissions to write to a certain other user (given by the url parameter :userId)
 */
exports.userWritePermissions = function(req, res, next) {
    if (!req.userId) return res.status(403).send("Wrong request: user not specified");
    if (!req.params.userId) return res.status(400).send("Bad request");

    let userId = req.userId;
    let targetUserId = req.params.userId;

    if (userId !== targetUserId) return res.status(401).send("Not authorized to edit the user");

    next();    
}

/* Ensures that only the about attribute is set during a PUT /users/:userId */
exports.keepOnlyAbout = function(req, res, next) {
    let about = req.body.about;
    if (!about) {
        req.body = {
            about: undefined
        }
    }
    else {
        req.body = {
            about: about
        };
    }
    next();
}