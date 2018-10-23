
const PORT = process.env.PORT || 5000;

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

express()
  .use(express.static(path.join(__dirname, 'app/public')))
  .set('views', path.join(__dirname, 'app/views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

console.log('Grandapp RESTful API server started on: ' + port);