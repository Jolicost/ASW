'use strict';
/* Author: Joan Oliva
* Basic API rest for users model */
var mongoose = require('mongoose'),
// dependencies seprated by commas. Be aware
User = mongoose.model('Users');

var config = require('../../../config/config.js');

exports.list = function(req,res) {
    User.find({}, function(err,users) {
        if (err)
            res.send(err);
        else
            res.json(users);
    });
};

exports.read = function(req,res) {
    let id = req.params.userId;
    User.findOne({_id: id}, function(err,user) {
        if (err) return res.status(500).send(err);
        else if (!user) return res.status(404).send("user not found");

        return res.json({
            username: user.username,
            createdAt: user.createdAt,
            karma: user.karma,
            about: user.about,
        });
    });
};

exports.create = function(req,res) {
    var new_User = new User(req.body);
    new_User.save(function(err,user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });
};

exports.update = function(req,res) {
    User.findOneAndUpdate({_id: req.params.userId}, req.body, function(err,user){
        if (err) res.send(err);
        else if (!user) res.status(404).send("user not found");
        else res.status(200).send("success")
        return res;
    });
};

exports.delete = function(req, res) {
    User.remove({
        _id: req.params.userId
    }, function(err, user){
        if (err)
            res.send(err);
        else
            res.json({message: 'User deleted'});
    });
};

exports.deleteAll = function(req, res) {
    User.deleteMany({} , function(err, user) {
        if (err)
            res.send(err);
        else
            res.json({message: 'All users deleted'});
    });
};


