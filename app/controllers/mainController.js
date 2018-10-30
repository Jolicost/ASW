'use strict';
var mongoose = require('mongoose'),
// dependencies seprated by commas. Be aware
Contribution = mongoose.model('Contributions'),
User = mongoose.model('Users');

var ContributionController = require('./contributionController');

exports.main = function(req,res) {
    Contribution
        /* Finds all contributions */
        .find({})
        .sort({ points: -1 })
        /* 
        Populate creates the JOIN path of the document
        on this specific case we are interested in joining user to the contribution */
        .populate({
            path: 'user'
        })
        /* Executes the query object and renders the appropiate page */
        .exec(function(err,ctrs) {
            res.render('pages/index',{contributions: ctrs});
        });
    
};


exports.submit = function(req,res) {
    res.render('pages/submit');
};

exports.newest = function(req,res) {
    Contribution
    .find({})
    .sort({ publishDate: -1 })
    .populate({
        path: 'user'
    })
    .exec((err,contributions) => {
        res.render('pages/newest',{contributions: contributions});
    });
}
