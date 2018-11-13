'use strict';
/* Author: Joan Oliva
* Basic API rest for contributions model */
var mongoose = require('mongoose'),
// dependencies seprated by commas. Be aware
Contribution = mongoose.model('Contributions'),
User  = mongoose.model('Users');
var async = require("async");

var main = require('./mainController');
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

exports.upvotedContributions = function(req, res){
    let user = req.query.id;
    Contribution
        .find({
            $or:[ 
                    {contributionType:"url"}, 
                    {contributionType:"ask"}
                ],
            upvoted: { "$in" : [user]}
        })
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
                res.render('pages/contributionsPlain', { contributions: ctrs });
            });
        });
};

exports.upvotedComments = function(req, res){
    let user = req.query.id;
    Contribution
        .find({
            $or:[ 
                    {contributionType:"comment"}, 
                    {contributionType:"reply"}
                ],
            upvoted: { "$in" : [user]}
        })
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
                    contribution['since'] = main.getSince(contribution.publishDate);
                    callback();
                });
            }, function (err) {
                res.render('pages/commentsPlain', { contributions: ctrs });
            });
           
        });
};



exports.submissions = async function(req,res) {
    var userId = req.query.id;
    if (userId == undefined) 
        res.send('No such user.');
    
    else {
        var uname = await User.findById(userId, function(err, user) {
            uname = user.username
        });
        Contribution
        .find({
            user: userId,
            $or:[ 
                    {contributionType:"url"}, 
                    {contributionType:"ask"}
                ]
        })
        .sort({ publishDate: -1 })
        .exec((err,contributions) => {
            async.forEach(contributions, function(contribution, callback) {
                //do stuff
                Contribution.countDocuments({topParent: contribution._id}).exec(function(err,n) {
                    contribution['nComments'] = n;
                    contribution['since'] = main.getSince(contribution.publishDate);

                    if (contribution['contributionType'] == 'url')
                        contribution['shortUrl'] = getShortUrl(contribution.content);
                    callback();
                });
                
            }, function (err) {
                res.render('pages/user_submissions',{contributions: contributions, username: uname.username
                });
            });
        });
    }
}

/* Returns the domain from an url */
function getShortUrl(url) {
    var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var domain = matches && matches[1];
    return domain;
}
