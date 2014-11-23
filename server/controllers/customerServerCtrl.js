var Customer = require('../models/customer');
module.exports = {
	getAllCustomers : function(req, res, next) {
		Customer.find({}).sort({'_id': -1}).exec(function(err, customers) {
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

			Customer.find({}).sort({'_id': -1}).exec(function(err, customers) {
	            if (err) {
	                return next(err);
	            }
	            res.json(customers);
	        });

		});
	},

    updateCustomer: function(req, res, next) {
        Customer.findOne({
            _id: req.body._id
        }, function(err, customer) {
            if (!err) {
                customer.code = req.body.code,
                    customer.name = req.body.name,
                    customer.mobileNo = req.body.mobileNo,
                    customer.phoneNo = req.body.phoneNo,
                    customer.address = req.body.address,
                    customer.location = req.body.location,
                    customer.state = req.body.state,
                    customer.emailId = req.body.emailId,
                    customer.activeState = req.body.activeState,

                    customer.save(function(err) {
                        if (err) {
                            console.log('error : ' + error);
                            return next(err);
                        }
			        	Customer.find({}).sort({'_id': -1}).exec(function(err, customers) {
				            if (err) {
				                return next(err);
				            }
				            res.json(customers);
				        });
                    });
            }
        });
    },	

	deleteCustomer : function(req, res, next) {
		Customer.remove({
			_id : req.params.customer_id
		}, function(err, todo) {
			if (err) {
				return next(err);
			}
			Customer.find({}).sort({'_id': -1}).exec(function(err, customers) {
	            if (err) {
	                return next(err);
	            }
	            res.json(customers);
	        });
		});
	}

};
