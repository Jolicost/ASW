'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContributionSchema = new Schema({
    title: {
        type: String,
        default: ""
    },

    // URL o Text
    content: {
        type: String,
        default: ""
    },

    publishDate: {
        type: Date,
        default: Date.now()
    },

    points: {
        type: Number,
        defaut: 0
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },

    contributionsType: {
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

    parent: {
        type: Schema.Types.ObjectId, 
        ref: 'Contributions'
    },

    topParent: {
        type: Schema.Types.ObjectId, 
        ref: 'Contributions'
    }
});

module.exports = mongoose.model('Contributions', ContributionSchema);