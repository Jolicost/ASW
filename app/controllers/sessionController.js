var mongoose = require('mongoose'),
User = mongoose.model('Users');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config/config.js');

var _this = this;

exports.login = function(req,res) {
    let goto = req.query.goto;
    if (req.method === 'POST'){
        let new_username = req.body.username;
        let new_password = req.body.password;

        if (!new_username || !new_password) {
            return res.redirect('/login');
        }
        let goto = req.body.goto;
        User.findOne({
            username: new_username,
            password: new_password
        }, function(err, user){
            if (err) return res.status(500).send(err);
            if (!user) {
                let u = new User({
                    username: new_username,
                    password: new_password
                });
                u.save(function(err, user) {
                    if (err) return res.status(500).send(err);
                    req.session.user = user;
                    _this.signToken(user, redirectGOTO.bind({
                        res: res,
                        goto: goto,
                        err: null
                    }));  
                });
            } else {  
                req.session.user = user;
                _this.signToken(user, redirectGOTO.bind({
                    res: res,
                    goto: goto,
                    err: null
                }));    
            }
        });
    }
    else if(req.method === 'GET'){
        res.render('pages/login', {goto: goto, githubUrl: '/auth/github'});
    } 
    
};

/* Signs the user token using their id and the secret key */
exports.signToken = function(user,cb)
{
    var token = jwt.sign({ id: user._id }, config.get('server.auth.secret'));
    User.updateOne({_id: user._id}, {token: token}, function(err) {
        if (err) return res.status(500).send(err);
        cb();
        console.log("Updated token for user: " + user.username + " with token:");
        console.log(token);
    }) 
}

function redirectGOTO() {
    if (this.err) this.res.status(500).send(this.err);
    return this.res.redirect(this.goto);
}

exports.logout = function(req,res) {
    let goto = req.query.goto;
    req.session.user = undefined;
    res.redirect(goto);
};

exports.testAuthorization = function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.get('server.auth.secret'), function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
        User.findById(decoded.id, function (err, user) {
          if (err) return res.status(500).send("There was a problem finding the user.");
          if (!user) return res.status(404).send("No user found.");
          
          res.status(200).send(user);
        });
    });
};