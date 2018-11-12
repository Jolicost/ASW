'use strict';
/* Author: Joan Oliva
* Basic API rest for contributions model */
var mongoose = require('mongoose'),
// dependencies seprated by commas. Be aware
Contribution = mongoose.model('Contributions');
var async = require("async");

// Unused
//for newest view. 
exports.sortByDate = function(req,res) {
    Contribution
    .find({})
    .sort({ publishDate: -1 })
    .exec((err,contributions) => {
        if (err) 
            res.send(err);
        else
            res.send(contributions);
    });
};

exports.list = function(req,res) {
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

exports.upvoted = function(req, res){
    let user = req.query.id;
    let comments = req.query.comments == 't';
    var ctrType = comments ? {$eq: 'comment'} : {$ne: 'comment'};
    var finds = {upvoted:user, contributionType: ctrType};
    Contribution
        .find(finds)
        .sort({ points: -1 })
        .lean()
        /* 
        Populate creates the JOIN path of the document
        on this specific case we are interested in joining user to the contribution */
        .populate({
            path: 'user'
        })
        /* Executes the query object and renders the appropiate page */
        .exec(function (err, ctrs) {
            async.forEach(ctrs, function (contribution, callback) {
                //do stuff
                Contribution.countDocuments({ topParent: contribution._id }).exec(function (err, n) {
                    contribution['nComments'] = n;
                    /*contribution['since'] = module.exports.getSince(contribution.publishDate);*/
                    /*contribution['shortUrl'] = getShortUrl(contribution.content);*/
                    callback();
                });
            }, function (err) {
                res.render('pages/index', { contributions: ctrs });
            });
        });
};
