'use strict';
var mongoose = require('mongoose'),
    // dependencies seprated by commas. Be aware
    Contribution = mongoose.model('Contributions'),
    User = mongoose.model('Users');


var ContributionController = require('./contributionController');
var async = require("async");

var bothError = "Submissions can't have both urls and text, so you need to pick one. If you keep the url, you can always post your text as a comment in the thread.";
var noTitle = "Please try again";
var urlExists = "The URL already exists";
var invalidURL = "Invalid URL";
var emptyError = "Content is emtpy!";

var validUrl = require('valid-url');

const { getObjectId } = require('../../seed/index');

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


exports.main = function (req, res) {
    Contribution
        /* Finds all contributions */
        .find({
            contributionType: "url"
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
                    contribution['since'] = getSince(contribution.publishDate);
                    contribution['shortUrl'] = getShortUrl(contribution.content);
                    callback();
                });

            }, function (err) {
                res.render('pages/index', { contributions: ctrs });
            });
        });
};


exports.submit = function (req, res) {
    res.render('pages/submit');
};

exports.submitForm = function(req,res) {
    var title = req.body.title.trim();
    var url = req.body.url.trim();
    var text = req.body.text.trim();


    if (!title) {
        return res.render('pages/submit', {errors: [noTitle]});
    }

    if (url && text) {
        return res.render('pages/submit', {errors: [bothError]});
    }

    if (!url && !text) {
        return res.render('pages/submit', {errors: [emptyError]});
    }

    if (url && !validUrl.isUri(url)) {
        return res.render('pages/submit', {errors: [invalidURL]});
    }

    User.findOne({username: req.session.user}, function(err, user) {
        if (err) return res.status(500).send("Internal server error");

        if (!user) return res.redirect('login?goto=submit');

        if (url) {
            Contribution.findOne({
                contributionType: 'url',
                content: url
            })
            .exec(function(err,result) {
                if (result != null) {
                    // redirect to page
                    return res.redirect('item?id=' + result._id);
                }
                else {
                    let ctr = new Contribution({
                        title: title,
                        content: url,
                        user: user,
                        contributionType: 'url'
                    });
                    ctr.save(function(error) {
                        return res.redirect('item?id=' + ctr._id);
                    });
                }
            });
        }
        else if (text) {
            let ctr = new Contribution({
                title: title,
                content: text,
                user: user,
                contributionType: 'ask'
            });
            ctr.save(function(error) {
                // render contriubtion page
                return res.redirect('item?id=' + ctr._id);
            })
        }

    });
    
    

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
        async.forEach(contributions, function(contribution, callback) {
            //do stuff
            Contribution.countDocuments({topParent: contribution._id}).exec(function(err,n) {
                contribution['nComments'] = n;
                contribution['since'] = getSince(contribution.publishDate);

                if (contribution['contributionType'] == 'url')
                    contribution['shortUrl'] = getShortUrl(contribution.content);
                callback();
            });
            
        }, function (err) {
            res.render('pages/newest',{contributions: contributions});
        });
    });
}

exports.ask = function(req,res) {
    Contribution
    .find({
        contributionType:'ask'
    })
    .sort({ publishDate: -1 })
    .populate({
        path: 'user'
    })
    .exec((err,contributions) => {
        async.forEach(contributions, function(contribution, callback) {
            //do stuff
            Contribution.countDocuments({topParent: contribution._id}).exec(function(err,n) {
                contribution['nComments'] = n;
                contribution['since'] = getSince(contribution.publishDate);
                callback();
            });
            
        }, function (err) {
            res.render('pages/ask',{contributions: contributions});
        });
    });
}


exports.contribution = function(req,res) {
    var id = req.query.id;
    Contribution
    .findById(id)
    .populate({
        path: 'user'
    })
    .exec(function(err,contribution) {
        if (err)
            res.send(err);
        else {
            async.parallel([
                function(callback) {
                    Contribution.countDocuments({topParent: contribution._id}).exec(function(err,n) {
                        contribution['nComments'] = n;
                        contribution['since'] = getSince(contribution.publishDate);
                        callback(null, contribution);                       
                    }); 
                },
                function(callback) {
                    getAllComments(contribution,callback);
                }
            ],
            // optional callback
            function(err, results) {
                // the results array will equal ['one','two'] even though
                // the second function had a shorter timeout.
                let contribution = results[0];
                let node = results[1];
                contribution['comments'] = node;
                            console.log(contribution);
                res.render('pages/contribution',{contribution: contribution});
            });
                
        }
    });
    
}

function getAllComments(contribution,callback) {
    Contribution
    .find(
        {topParent: contribution._id}
    )
    .exec(function(err, contributions) {
        let res = getNode(contribution,contributions);
        callback(null,res);
    });    
}

function getNode(root,contributions) {
    let ret = [];
    contributions.forEach(function(contribution) {
        if (contribution.parent._id.equals(root._id)) {
            ret.push({
                content: contribution.content,
                _id: contribution._id,
                since: getSince(contribution.publishDate),
                user: contribution.user.username,
                comments: getNode(contribution,contributions)
            });
        }
    });
    return ret;
}
