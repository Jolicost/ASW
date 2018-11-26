'use strict';
/* Author: Joan Oliva
* Basic API rest for contributions model */
var mongoose = require('mongoose'),
// dependencies seprated by commas. Be aware
Contribution = mongoose.model('Contributions'),
User  = mongoose.model('Users');
var config = require('../../../config/config.js');
var validUrl = require('valid-url');
var async = require("async");

function getDataFilter(data){
    if (! data) return undefined;
    else if (data.length == 10){
        var operator = data.substr(0, 2);
        var date = data.substr(2);
        var dateObj = new Date(date.substr(0, 4), date.substr(4, 2), date.substr(6, 2), 1);
        var returnObj = {};
        //DBObject dbObj;
        if (operator === 'eq'){
            returnObj =  {
                publishDate: {
                    "$eq": dateObj
                }
            };
        }
        else if (operator === 'ne'){
            returnObj =  {
                publishDate: {
                    "$ne": dateObj
                }
            };
        }
        else if (operator === 'gt'){
            returnObj =  {
                publishDate: {
                    "$gt": dateObj
                }
            };
        }
        else if (operator === 'lt'){
            returnObj =  {
                publishDate: {
                    "$lt": dateObj
                }
            };
        }
        else if (operator === 'ge'){
            returnObj =  {
                publishDate: {
                    "$gte": dateObj
                }
            };
        }
        else if (operator === 'le'){
            returnObj =  {
                publishDate: {
                    "$lte": dateObj
                }
            };
        }
        return returnObj;
    }
    else{
        return undefined;
    }
}

function validateType(typeStr){
    if (["url", "ask", "comment", "reply"].includes(typeStr)) return {contributionType: typeStr};
    else 
        if ( typeStr === "main" || !typeStr ) 
            return {
                contributionType: {
                    $in: ['url', 'ask']
                }
            };
        else
            return false;
}


exports.list = function(req,res) {

    /*Query parameters
        user=userId
        type=type['url', 'ask', 'comment', 'reply', 'main']
        date= date [eqyyyymmdd, neyyyymmdd, gtyyyymmdd, ltyyyymmdd, geyyyymmdd, leyyyymmdd]
        sort=sort [date, points, title, user, type]
        upvoted=userId
    */
    var user = req.query.user;
    user = user ? {"user":user} : {};
    var date = getDataFilter(req.query.date);
    var upvoted = req.query.upvoted;
    upvoted = upvoted ? {"upvoted": upvoted} : {};
    var type = validateType(req.query.type);
    if (type){
        var result = Object.assign({},user, date, type, upvoted);
        console.log(result);
        Contribution.find(result).exec((err,contributions) => {
            if (err)
                res.send(err);
            else
                res.json(contributions);
        });
    }
    else{
        return res.status(400).send({
            message: 'contributionType is not defined'
        });
    }
    
};

exports.read = function(req,res) {
    Contribution.findById(req.params.contributionId, function(err,contribution) {
        if (err)
            res.send(err);
        else
            res.json(contribution);
    });
};

exports.create = function (req, res) {
    var title = req.body.title;
    var url = req.body.url;
    var text = req.body.text;
    let user = req.user;

    if (!title) return res.status(400).send("Bad request, no title provided");

    if (url && text) return res.status(432).send("Bad request, title and url provided");

    if (!url && !text) return res.status(434).send("Bad request, provide url or text");

    if (url && !validUrl.isUri(url)) return res.status(433).send("Bad request, url not valid");

    title = title.trim();

    if (url) {
        url = url.trim();
    }

    if (text) {
        text = text.trim();
    }

    if (url) {
        Contribution.findOne({
            contributionType: 'url',
            content: url
        })
        .exec((err, result) => {
            if (result) {
                return res.json(result);
            }
            else {
                let ctr = new Contribution({
                    title: title,
                    content: url,
                    user: user.id,
                    contributionType: 'url'
                });
                ctr.save(function(err) {
                    return res.json(ctr);
                });
            }
        });
    }
    else if (text) {
        let ctr = new Contribution({
            title: title,
            content: text,
            user: user.id,
            contributionType: 'ask'
        });
        ctr.save(function(err) {
            return res.json(ctr);
        });
    }
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
    Contribution.findOne({_id: req.params.id }, function(err,contribution) {
        if (err) return res.status(500).send(err);
        else if (!contribution) res.status(404).send("contribution not found");
        else return res.json(contribution);
    });
};

exports.comment = function(req, res) {
    let contributionId = req.params.contributionId;
    let text = req.body.text;
    let user = req.user;

    if (!text || !text.trim()) return res.status(400).send("comment missing");

    Contribution.findOne({_id: contributionId}, function(err, contribution) {
        if (!contribution) return res.status(404).send("contribution not found");

        /* Resolve type */
        let type = 'comment';
        if (contribution.contributionType == 'comment' || contribution.contributionType == 'reply') {
            type = 'reply';
        }

        /* Resolve parent */
        let topParent = contribution.topParent;
        if(!topParent) {
            topParent = contribution._id;
        }

        let c = new Contribution({
            content: text,
            user: user._id,
            contributionType: type,
            parent: contribution._id,
            topParent: topParent
        });

        c.save(function(err) {
            if (err) return res.status(500).send();

            Contribution.updateOne({_id: contribution._id}, {
                $push: {child: c._id}
            }, function(err){
                if (err) return res.status(500).send();
                return res.status(200).send("comment added");

            });
        });
    });
}