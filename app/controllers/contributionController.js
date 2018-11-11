'use strict';
/* Author: Joan Oliva
* Basic API rest for contributions model */
var mongoose = require('mongoose'),
// dependencies seprated by commas. Be aware
Contribution = mongoose.model('Contributions');

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

exports.upvoted = function(req, res){
    let user = req.query.id;
    let comments = req.query.comments == 't';
    console.log('El user: '+user+' pidio comments? '+comments);
    Contribution.find({upvoted:user}, function(err,contributions) {
        if (err)
            res.send(err);
        else
            res.json(contributions);
    });
};


exports.submissions = function(req,res) {
    var userId = req.query.id;
    if (userId == undefined) 
        res.send('No such user.');
    
    else {
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
                res.render('pages/index',{contributions: contributions});
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