var mongoose = require('mongoose'),
User = mongoose.model('Users');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../../config/config.js');

exports.login = function(req,res) {
    let new_username = req.body.username;
    let new_password = req.body.password;

    if (!new_username || !new_password) {
        return res.status(400).send("bad login data");
    }

    User.findOne({
        username: new_username,
        password: new_password
    }, function(err, user){
        if (err) return res.status(500).send(err);
        if (!user) {
            let u = new User({
                username: new_username,
                password: new_password
            });
            u.save(function(err, user) {
                if (err) return res.status(500).send(err);
                exports.signToken(user, function(err, token) {
                    if (err) return res.send(err);
                    else return res.json({
                        _id: user._id,
                        username: user.username,
                        token: token
                    });
                });
            });
        } else {  
            exports.signToken(user,function(err, token) {
                if (err) return res.send(err);
                else return res.json({
                    _id: user._id,
                    username: user.username,
                    token: token
                });
            });    
        }
    });
};

exports.githubLogin = function(req, res) {
    let token = req.body.token;

    if (!token) return res.status(400).send("token not provided");

    // Verify token and get github id

    let profileId = token;
    let username = token;

    User.findOne({'auth.github.id': profileId }, function(err, user){
            if (err) return req.send(err);
            if (user) {
                exports.signToken(user, function(err, token) {
                    if (err) return res.send(err);
                    else return res.json({
                        _id: user._id,
                        username: user.username,
                        token: token
                    });
                }); 
            } else {
                let u = new User();

                u.auth.github.id = profileId
                u.username = username;

                u.save(function(err, user){
                    if (err) throw err;
                    exports.signToken(user, function(err, token) {
                    if (err) return res.send(err);
                    else return res.json({
                        _id: user._id,
                        username: user.username,
                        token: token
                    });
                });                     
                });
            }
        });
}

exports.signToken = function(user,cb)
{
    var token = jwt.sign({ id: user._id }, config.get('server.auth.secret'));
    User.updateOne({_id: user._id}, {token: token}, function(err) {
        if (err) cb(err,null)
        cb(null,token);
    });
}

exports.verify = function(req, res) {
    let user = req.user;

    exports.signToken(user, function(err, token) {
        if (err) return res.send(err);
        else return res.json({
            _id: user._id,
            username: user.username,
            token: token
        });
    }); 

}