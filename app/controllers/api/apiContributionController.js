'use strict';
/* Author: Joan Oliva
* Basic API rest for contributions model */
var mongoose = require('mongoose'),
// dependencies seprated by commas. Be aware
Contribution = mongoose.model('Contributions'),
User  = mongoose.model('Users');
var config = require('../../../config/config.js');

exports.list = function(req,res) {

    /*Query parameters
        user=userId
        type=type
        sort=sort
        upvoted=userId
        something more?
    */
    Contribution.find({}, function(err,contributions) {
        if (err)
            res.send(err);
        else
            res.json(contributions);
    });
};

exports.read = function(req,res) {
    Contribution.findById(req.params.contributionId, function(err,contribution) {
        if (err)
            res.send(err);
        else
            res.json(contribution);
    });
};

exports.create = function(req,res) {
    var new_Contribution = new Contribution(req.body);
    new_Contribution.save(function(err,contribution) {
        if (err)
            res.send(err);
        else
            res.json(contribution);
    });
};

exports.update = function(req,res) {
    Contribution.findOneAndUpdate({_id: req.params.contributionId}, req.body, {new: true}, function(err,contribution){
        if (err)
            res.send(err);
        else
            res.json(contribution);
    });
};

exports.delete = function(req, res) {
    Contribution.remove({
        _id: req.params.contributionId
    }, function(err, contribution){
        if (err)
            res.send(err);
        else
            res.json({message: 'Contribution deleted'});
    });
};

exports.deleteAll = function(req, res) {
    Contribution.deleteMany({} , function(err, contribution) {
        if (err)
            res.send(err);
        else
            res.json({message: 'All contributions deleted'});
    });
};

exports.vote = function(req, res){
    var data = {
        $addToSet: {
            upvoted: req.userId
        },
        $inc: {
            points: 1
        }
    };
    Contribution.findOneAndUpdate({_id: req.params.contributionId}, data, {new: true}, function(err,contribution){
        if (err)
            res.send(err);
        else
            res.json(contribution);
    });
}

exports.unvote = function(req, res){
    var data = {
        $pull: {
            upvoted: req.userId
        },
        $inc: {
            points: -1
        }
    };
    Contribution.findOneAndUpdate({_id: req.params.contributionId}, data, {new: true}, function(err,contribution){
        if (err)
            res.send(err);
        else
            res.json(contribution);
    });
}


exports.readContribution = function(req,res) {
    Contribution.findById(req.params.id, (err,contribution) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json(contribution);

        /* 
        //per si no volem enviar totes les dades...
        let data = {
            title: contribution.title,
            content: contribution.content,
            publishDate: contribution.publishDate,
            points: contribution.points,
            upvoted: contribution.upvoted,
            user: contribution.user,
            contributionType: contribution.contributionType,
            parent: contribution.parent,
            child: contribution.child
        }
        res.json(data); 
        */
    });
};