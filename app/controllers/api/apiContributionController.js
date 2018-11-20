'use strict';
/* Author: Joan Oliva
* Basic API rest for contributions model */
var mongoose = require('mongoose'),
// dependencies seprated by commas. Be aware
Contribution = mongoose.model('Contributions'),
User  = mongoose.model('Users');
var config = require('../../../config/config.js');

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