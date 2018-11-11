var mongoose = require('mongoose'),
User = mongoose.model('Users');


exports.login = function(req,res) {
    let goto = req.query.goto == undefined ? '/' : req.query.goto;
    if (req.method === 'POST'){
        let new_username = req.body.username;
        let new_password = req.body.password;
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
                u.save(function(err) {
                    if (err) return res.status(500).send(err);
                    console.log("created new user");
                    req.session.user = u;
                    return res.redirect(goto);
                });
            } else {
                req.session.user = user;
                res.redirect(goto);
            }
        });
    }
    else if(req.method === 'GET'){
        res.render('pages/login', {goto: goto, githubUrl: '/auth/github'});
    } 
    
};

exports.logout = function(req,res) {
    let goto = req.query.goto;
    req.session.user = undefined;
    res.redirect(goto);  
};