'use strict';
var mongoose = require('mongoose'),
// dependencies seprated by commas. Be aware
Contribution = mongoose.model('Contributions'),
User = mongoose.model('Users');

var ContributionController = require('./contributionController');
var async = require("async");

var bothError = "Submissions can't have both urls and text, so you need to pick one. If you keep the url, you can always post your text as a comment in the thread.";

/* Returns the domain from an url */
function getShortUrl(url) {
    var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var domain = matches && matches[1];
    return domain;
}

/* Returns the "x time ago" date format from a date */
function getSince(date) {
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
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
                contribution['since'] = getSince(contribution.publishDate);
                contribution['shortUrl'] = getShortUrl(contribution.content);
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

exports.submitForm = function(req,res) {
    var title = req.body.title;
    var url = req.body.url;
    var text = req.body.text;
    
    res.render('pages/submit',{errors:[bothError]})

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

