
const PORT = process.env.PORT || 3000;

/* express routing dependency. Add all your modules here */
var express = require('express'),
    app = express(),
    port = PORT,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Contribution = require('./app/models/contribution'),
    User = require('./app/models/user');

const path = require('path');

/* Deployment settings */
mongoose.Promise = global.Promise;
var production = 'mongodb://heroku_ftmpcjnq:o0c10b0j0dd5nae1bviv19bbl9@ds139883.mlab.com:39883/heroku_ftmpcjnq'
var local = 'mongodb://localhost/ASW';
var dbURL = production;

/* 
Change port depending on environment
Local/Development:  3000
Deployment: Inherit
*/
const environment = process.env.NODE_ENV || 'development';

if (environment === 'development' ) {
    dbURL = local;
}

/* Connect mongoose object mapper to the database (mongoDB must be running) */
mongoose.connect(dbURL,{ 
    useNewUrlParser: true 
});

// Register some dependencies needed for the API
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// API REST Routing
var contributionRoutes = require('./app/routes/contributionRoutes');
var userRoutes = require('./app/routes/userRoutes');
// MVC Routing
var mainRoutes = require('./app/routes/mainRoutes');

// Register the routes
contributionRoutes(app);
userRoutes(app);
mainRoutes(app);

// Register static resources, views folder and view engine
app.use(express.static(path.join(__dirname, 'app/public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// Start the application
app.listen(port);

// All good!
console.log('Practica ASW started on port: ' + port);