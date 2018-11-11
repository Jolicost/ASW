'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/* 
User Schema
Represents an user in the application
An user can have multiple contributions, post in contributions and do other stuff
*/
var UserSchema = new Schema({
	//_id is implicit
	// Username
    username: {
        type: String,
        default: ""
    },
    // Password. Not crypted (for now)
    password: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    // creation date
    createdAt: {
        type: Date,
        default: Date.now()
    },
    // Derived information (needs to be choosen how)
    karma: {
        type: Number,
        default: 0
    },
    // user about (plain text)
    about: {
        type: String,
        default: ""
    },
    token: {
        type: String
    },
    auth: {
        github: {
            id: {
                type: String
            }
        }
    }
});

// Make the model visible to other modules across mongoose
module.exports = mongoose.model('Users', UserSchema);