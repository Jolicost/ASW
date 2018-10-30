'use strict';
var mongoose = require('mongoose'),
// dependencies seprated by commas. Be aware
Contribution = mongoose.model('Contributions'),
User = mongoose.model('Users');

var ContributionController = require('./contributionController');
var async = require("async");


function populateContributions(contributions)
{
    for (var i = 0; i < contributions.length; i++) {
        var n = ContributionController.numberOfComments(contributions[i]._id);
        contributions[i].numberOfComments = n;
    }
}



exports.main = function(req,res) {
    Contribution
    /* Finds all contributions */
    .find({
        contributionType:"url"
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
    .exec(function(err,ctrs) {
        async.forEach(ctrs, function(contribution, callback) {
            //do stuff
            Contribution.countDocuments({topParent: contribution._id}).exec(function(err,n) {
                contribution['nComments'] = n;
                callback();
            });
            
        }, function (err) {
            res.render('pages/index',{contributions: ctrs});
        });
    });
};


exports.submit = function(req,res) {
    res.render('pages/submit');
};

exports.newest = function(req,res) {
    Contribution
    .find({
        $or:[ 
                {contributionType:"url"}, 
                {contributionType:"ask"}
            ]
    })
    .sort({ publishDate: -1 })
    .populate({
        path: 'user'
    })
    .exec((err,contributions) => {
        res.render('pages/newest',{contributions: contributions});
    });
}

