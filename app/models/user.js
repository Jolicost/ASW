'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// _id is implicid
var UserSchema = new Schema({
    username: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('User', UserSchema);