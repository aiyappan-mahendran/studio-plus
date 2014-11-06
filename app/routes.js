// grab the product model we just created
var Product = require('./models/product');

module.exports = function(app, passport) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// sample api route
	app.get('/api/products', auth, function(req, res) {
		// use mongoose to get all products in the database
		Product.find(function(err, products) {

			// if there is an error retrieving, send the error.
			// nothing after res.send(err) will execute
			if (err)
				res.send(err);

			res.json(products);
			// return all nerds in JSON format
		});
	});

	// create product and send back all products after creation
	app.post('/api/products', auth, function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Product.create({
			name : req.body.name,
			code : req.body.code,
			minQuantity : req.body.minQuantity,
			price : req.body.price,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Product.find(function(err, products) {
				if (err)
					res.send(err)
				res.json(products);
			});
		});

	});
	// route to handle delete goes here (app.delete)
	app.delete('/api/products/:product_id', auth, function(req, res) {
		Product.remove({
			_id : req.params.product_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Product.find(function(err, products) {
				if (err)
					res.send(err)
				res.json(products);
			});
		});
	});

	//==================================================================
	// routes
	app.get('/', function(req, res) {
		res.render('index', {
			title : 'Express'
		});
	});

	//==================================================================
	// route to test if the user is logged in or not
	app.get('/loggedin', function(req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	});

	// route to log in
	app.post('/login', passport.authenticate('local-login'), function(req, res) {
		res.send(req.user);
	});

	app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
		res.send(req.user);
	});

	// route to log out
	app.post('/logout', function(req, res) {
		req.logOut();
		res.send(200);
	});
	//==================================================================
};

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next) {
	if (!req.isAuthenticated())
		res.send(401);
	else
		next();
};
