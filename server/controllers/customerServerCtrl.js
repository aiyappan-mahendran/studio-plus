var Customer = require('../models/customer');
module.exports = {
	getAllCustomers : function(req, res, next) {
		Customer.find(function(err, customers) {
			if (err) {
				return next(err);
			}
			res.json(customers);
		});
	},

	createCustomer : function(req, res, next) {
		Customer.create({
			code 		: req.body.code,
			name 		: req.body.name,
			mobileNo 	: req.body.mobileNo,
			phoneNo 	: req.body.phoneNo,
			address 	: req.body.address,
			location 	: req.body.location,
			state 		: req.body.state,
			emailId 	: req.body.emailId,
			activeState : req.body.activeState,
			done 		: false
		}, function(err, todo) {
			if (err) {
				return next(err);
			}

			Customer.find(function(err, customers) {
				if (err) {
					return next(err);
				}
				res.json(customers);
			});
		});
	},

	deleteCustomer : function(req, res, next) {
		Customer.remove({
			_id : req.params.customer_id
		}, function(err, todo) {
			if (err) {
				return next(err);
			}
			Customer.find(function(err, customers) {
				if (err) {
					return next(err);
				}
				res.json(customers);
			});
		});
	}
};
