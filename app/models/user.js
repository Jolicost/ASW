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
	_id: { 
		type: Schema.ObjectId, 
		auto: true 
	}
	// Username
    username: {
        type: String,
        default: ""
    },
    // Password. Not crypted (for now)
    password: {
        type: String,
        default: ""
    }
});

// Make the model visible to other modules across mongoose
module.exports = mongoose.model('Users', UserSchema);