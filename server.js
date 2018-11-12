// Everything starts with something
console.log('Reading configuration files...');
const config = require('./config/config.js');
// Read the configuration variables
var PORT  = config.get('server.port');
var DB = config.get('db.host');
// Print some of them just for information
console.log('Read PORT from config: ' + PORT);
console.log('Read Database host DB from config: ' + DB);
/* Models */
let user = require('./app/models/user');

/* express routing dependency. Add all your modules here */
var express = require('express'),
    app = express(),
    port = PORT,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    engine = require('ejs-blocks'),
    Contribution = require('./app/models/contribution'),
    User = user

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.text());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');

/* Deployment settings */
mongoose.Promise = global.Promise;

/* Connect mongoose object mapper to the database (mongoDB must be running) */
mongoose.connect(DB,{ 
    useNewUrlParser: true 
});

// Register some dependencies needed for the API
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//session
var session = require('express-session');
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: {}, user: undefined}));
app.use(function(req, res, next) {
    if (req.query != undefined){
        var params = '?';
        Object.keys(req.query).map(function(objectKey, index) {
            var value = req.query[objectKey];
            params = params + objectKey + '='+value.replace(' ', '%20');
        });
    }
    else{
        var params = '';
    }
    res.locals.path = req.path+params;
    if (req.session != undefined){
        res.locals.user = req.session.user;
    }
    else{
        res.locals.user = undefined;
    }
    next();
  });

// API REST Routing
var contributionRoutes = require('./app/routes/contributionRoutes');
var userRoutes = require('./app/routes/userRoutes');
// MVC Routing
var mainRoutes = require('./app/routes/mainRoutes');
// Session Routing
var passport = require('passport');
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

var sessionRoutes = require('./app/routes/sessionRoutes');

// Register the routes
contributionRoutes(app);
userRoutes(app);
mainRoutes(app);
sessionRoutes(app,passport);

// Register static resources, views folder and view engine
app.use(express.static(path.join(__dirname, 'app/public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// Start the application
app.listen(PORT);

// All good!
console.log('Practica ASW started on port: ' + PORT);
// And ends sometime
module.exports = app