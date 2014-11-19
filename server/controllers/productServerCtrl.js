var Product = require('../models/product');
module.exports = {
	getAllProducts : function(req, res, next) {
		Product.find(function(err, products) {
			if (err) {
				return next(err);
			}
			res.json(products);
		});
	},

	createProduct : function(req, res, next) {
		Product.create({
			name : req.body.name,
			code : req.body.code,
			minQuantity : req.body.minQuantity,
			price : req.body.price,
			activeState: req.body.activeState,
			done : false
		}, function(err, todo) {
			if (err) {
				return next(err);
			}

			Product.find(function(err, products) {
				if (err) {
					return next(err);
				}
				res.json(products);
			});
		});
	},

	deleteProduct : function(req, res, next) {
		Product.remove({
			_id : req.params.product_id
		}, function(err, todo) {
			if (err) {
				return next(err);
			}
			Product.find(function(err, products) {
				if (err) {
					return next(err);
				}
				res.json(products);
			});
		});
	}
};
