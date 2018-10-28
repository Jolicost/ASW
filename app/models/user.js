'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// _id is implicit
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

module.exports = mongoose.model('Users', UserSchema);