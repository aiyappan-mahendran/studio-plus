// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function(passport) {

	//==================================================================
	// Define the strategy to be used by PassportJS
	passport.use(new LocalStrategy(function(username, password, done) {
		if (username === "admin" && password === "admin")// stupid example
			return done(null, {
				name : "admin"
			});

		return done(null, false, {
			message : 'Incorrect username.'
		});
	}));

	// Serialized and deserialized methods when got from session
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

}; 