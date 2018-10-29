'use strict';
module.exports = function (app) {
    /* A route belongs to 1 function of any controller, use the appropiate one */
    var contribution = require('../controllers/contributionController');
    var user = require('../controllers/userController');
    var main = require('../controllers/mainController');

    // Main routes of the application
    app.route('/')
        .get((req, res) => res.render('pages/index'));

    
    app.get('/newest', (req, res) => { //https://scotch.io/tutorials/use-ejs-to-template-your-node-application
            contribution.createFake();
            contribution.createFake();
            var result_query = contribution.list();
            /* if (result_query == undefined) {
                result_query =  [
                    { 
                        title: "hola"
                     },
                    { 
                        title: "hola2" 
                    },
                    { 
                        title: "hola3" 
                    }
                ]
            } */
            res.render('pages/newest', {
                contributions: result_query
            })
        }
    );

    // Testing route for MVC example 
    app.route('/testModel')
        .get(main.main);


}