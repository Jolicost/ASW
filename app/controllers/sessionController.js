exports.login = function(req,res) {
    let goto = req.query.goto == undefined ? '/' : req.query.goto;
    if (req.method === 'POST'){
        let new_username = req.body.username;
        let new_password = req.body.password;
        let goto = req.body.goto;
        req.session.sessionUser = new_username;
        res.redirect(goto);
    }
    else if(req.method === 'GET'){
        if (req.session.sessionUser != undefined){
            res.redirect(goto);
        }
        else{
            res.render('pages/login', {goto: goto});
        }    
    } 
    
};

exports.logout = function(req,res) {
    let goto = req.query.goto;
    req.session.sessionUser = undefined;
    res.redirect(goto);
    
    
};