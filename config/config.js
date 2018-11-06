const convict = require('convict');

// Define schema
var defaultPort = process.env.PORT || 3000;

var config = convict({
  env: {
    doc: "ASW Application Environment",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },  
  db: {
    host: {
      doc: "Database host name/IP",
      format: '*',
      default: 'mongodb://localhost/ASW'
    }
  },
  server: {
    port: {
      doc: "Server PORT",
      format: '*',
      default: defaultPort
    }  
  },
  configAuth : {
    google : {
        clientID      : '902980117589-ic7v2n0kood4nu7c99j3lsnnsip4870b.apps.googleusercontent.com',
        clientSecret  : 'xZvK7EAA8Ev4BZM564QSjkwN',
        callbackURL   : 'http://localhost:3000/auth/google/callback'
    }
  }
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({allowed: 'strict'});
module.exports = config;