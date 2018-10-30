'use strict';
var mongoose = require('mongoose'),
// dependencies seprated by commas. Be aware
Contribution = mongoose.model('Contributions'),
User = mongoose.model('Users');

exports.main = function(req,res) {
    Contribution
        /* Finds all contributions */
        .find({})
        /* 
        Populate creates the JOIN path of the document
        on this specific case we are interested in joining user to the contribution */
        .populate({
            path: 'user'
        })
        /* Executes the query object and renders the appropiate page */
        .exec(function(err,ctrs) {
            res.render('pages/testModel',{contributions: ctrs});
        });
    
};


exports.submit = function(req,res) {
    res.render('pages/submit');
};
