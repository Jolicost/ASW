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

exports.login = function(req,res) {
    let goto = req.query.goto;
    if (req.method === 'POST'){
        let new_username = req.body.new_username;
        let new_password = req.body.new_password;
        console.log(new_username+'|'+new_password);
        res.render('pages/login');
    }
    else if(req.method === 'GET'){
        if (goto != undefined){
            console.log('Esto paso por el goto');
            res.render('pages/login', {goto: goto});
        }
        else{
            res.render('pages/login');
        }
    } 
    
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
