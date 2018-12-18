'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Contribution Schema
A contribution can be:
    url: normal post. Specifies title and url to another web page
    ask: question, has a body
    comment: special kind of contribution. Belongs to a parent contribution (url or ask)
    reply: a reply to a comment
Attributes for the different types are merged inside this mode.
Controllers should be spearated, though. 
We believe that common (shared) attributes are more relevant than separated attributes accross 
the different 4 types. Hence why we decided to join the whole set of publications under the same model
*/
var ContributionSchema = new Schema({
    //_id is implicit

    // Title of the contribution
    title: {
        type: String,
        default: ""
    },
    // URL or Text if type = url or type = ask
    content: {
        type: String,
        default: ""
    },
    // date of publication. Serves for all kinds of contribution
    publishDate: {
        type: Date,
        default: Date.now()
    },
    /* points of the contribution. Every kind can be upvoted and unvoted 
    ** derived information. Can be resolved using upvoted collection size
    */   
    points: {
        type: Number,
        default: 0
    },

    /* Collection of users that upvoted this contribution */
    upvoted: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }
        ], 
        default: []
    },

    /* Creation user */
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },

    /* Contribution type */
    contributionType: {
        type: String,
        enum: 
            [
            'url', 
            'ask',
            'comment',
            'reply'
            ],
        default: "url"
    },

    comments: {
        type: Number,
        default: 0
    },

    /* Immediate parent. Used for comments hierarchy */
    parent: {
        type: Schema.Types.ObjectId, 
        ref: 'Contributions'
    },

    /* Top parent. Used for comments hierarchy reference to top parent (needs revision) */
    topParent: {
        type: Schema.Types.ObjectId, 
        ref: 'Contributions'
    },

    /* Child contribution references. contributions are double referenced */
    child: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Contributions'
            }
        ], 
        default: []
    }
});

/* Make the model visible across mongoose */
module.exports = mongoose.model('Contributions', ContributionSchema);