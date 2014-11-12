var passport = require('passport');

module.exports = {
	loggedin : function(req, res, next){
		res.send(req.isAuthenticated() ? req.user : '0');
	},
	
	login : function(req, res, next) {
		passport.authenticate('local-login', function(err, user) {

            if(err)     { return next(err); }
            if(!user)   { return res.send(400); }
			//console.log("user details : "+ JSON.stringify(user));
			//console.log("user role details : "+ JSON.stringify(user.role));
			//console.log("user role details : "+ JSON.stringify(user.role.bitMask));
			//console.log("user role details : "+ JSON.stringify(user.role.title));

            req.logIn(user, function(err) {
                if(err) {
                    return next(err);
                }

                if(req.body.rememberme) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
                res.json(200, { "role": user.role, "username": user.username });
                //res.send(req.user);
            });
        })(req, res, next);
	},
	
	signup : function(req, res, next){
		passport.authenticate('local-signup', function(err, user) {

            if(err)     { return next(err); }
            if(!user)   { return res.send(400); }


            req.logIn(user, function(err) {
                if(err) {
                    return next(err);
                }

                if(req.body.rememberme) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
                //res.json(200, { "role": user.role, "username": user.username });
                res.send(req.user);
            });
        })(req, res, next);
	},
	
	logout : function(req, res) {
		req.logout();
        res.send(200);
	}
	
};
