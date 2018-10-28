// Everything starts with something
console.log('Reading configuration files...');
const config = require('./config/config.js');
// Read the configuration variables
var PORT  = config.get('server.port');
var DB = config.get('db.host');
// Print some of them just for information
console.log('Read PORT from config: ' + PORT);
console.log('Read Database host DB from config: ' + DB);
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

/* Connect mongoose object mapper to the database (mongoDB must be running) */
mongoose.connect(DB,{ 
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
app.listen(PORT);

// All good!
console.log('Practica ASW started on port: ' + PORT);
// And ends sometime