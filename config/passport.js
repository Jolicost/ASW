var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User       = require('../app/models/user');

const config = require('./config.js');
// Read the configuration variables
var configAuth  = config.get('configAuth.google');
var configAuthGithub = config.get('configAuth.github');


module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))
    // code for facebook (use('facebook', new FacebookStrategy))
    // code for twitter (use('twitter', new TwitterStrategy))

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.clientID,
        clientSecret    : configAuth.clientSecret,
        callbackURL     : configAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ googleId : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();

                    // set all of the relevant information
                    newUser.googleId    = profile.id;
                    newUser.token = token;
                    newUser.username = profile.displayName;
                    newUser.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));


    /// GITHUB
    var GitHubStrategy = require('passport-github').Strategy;

    passport.use(new GitHubStrategy({
        clientID: configAuthGithub.clientID,
        clientSecret: configAuthGithub.clientSecret,
        callbackURL: configAuthGithub.callbackURL
      },
      function(accessToken, refreshToken, profile, cb) {

        User.findOne({ 'auth.github.id': profile.id }, function(err, user){
            if (err) return cb(err);

            if (user) {
                return cb(null,user);
            } else {
                let u = new User();

                u.auth.github.id = profile.id;
                console.log(profile.username);
                u.username = profile.username;

                u.save(function(err){
                    if (err) throw err;
                    return cb(null,u);
                });
            }
        });
      }
    ));

};