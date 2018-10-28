
const PORT = process.env.PORT || 3000;

var express = require('express'),
    app = express(),
    port = PORT,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Contribution = require('./app/models/contribution'),
    User = require('./app/models/user');

const path = require('path');

mongoose.Promise = global.Promise;
var production = 'mongodb://heroku_ftmpcjnq:o0c10b0j0dd5nae1bviv19bbl9@ds139883.mlab.com:39883/heroku_ftmpcjnq'
var local = 'mongodb://localhost/ASW';
var dbURL = production;


const environment = process.env.NODE_ENV || 'development';

if (environment === 'development' ) {
    dbURL = local;
}

mongoose.connect(dbURL,{ 
    useNewUrlParser: true 
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.listen(port);

// API REST Routing
var contributionRoutes = require('./app/routes/contributionRoutes');
var userRoutes = require('./app/routes/userRoutes');
var mainRoutes = require('./app/routes/mainRoutes');

// Register the routes
contributionRoutes(app);
userRoutes(app);
mainRoutes(app);

app.use(express.static(path.join(__dirname, 'app/public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

/*
express()
  .use(express.static(path.join(__dirname, 'app/public')))
  .set('views', path.join(__dirname, 'app/views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/testModel', (req,res) => res.render('pages/testModel'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
*/

app.listen(port);

console.log('Practica ASW started on port: ' + port);