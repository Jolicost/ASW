'use strict';
/* Author: Joan Oliva
* Basic API rest for contributions model */
var mongoose = require('mongoose'),
// dependencies seprated by commas. Be aware
Contribution = mongoose.model('Contributions');


////////////////just for testing ////////////////////////
var count = 0;
exports.createFake = function(req,res) {
    var new_Contribution = new Contribution({
        title: "title" +  (++count)
    });
    
    new_Contribution.save((err,contribution) => {
        if (err) res.send(err);
        else res.json(contribution);
    });
};
////////////////////////////////////////////////////

//for newest view
exports.sortByDate = function(req,res) {
    Contribution
    .find({})
    .sort({ publishDate: -1 })
    .exec((err,contributions) => {
        if (err) res.send(err);
        else res.send(contributions);
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