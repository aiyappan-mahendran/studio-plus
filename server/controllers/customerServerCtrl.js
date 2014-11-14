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
			name : req.body.name,
			code : req.body.code,
			mobileNo : req.body.mobileNo,
			address : req.body.address,
			done : false
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
