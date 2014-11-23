var Product = require('../models/product');
module.exports = {
    getAllProducts: function(req, res, next) {
        Product.find({}).sort({'_id': -1}).exec(function(err, products) {
            if (err) {
                return next(err);
            }
            res.json(products);
        });


    },

    createProduct: function(req, res, next) {
        Product.create({
            name: req.body.name,
            code: req.body.code,
            minQuantity: req.body.minQuantity,
            price: req.body.price,
            activeState: req.body.activeState,
            done: false
        }, function(err, todo) {
            if (err) {
                return next(err);
            }
        	Product.find({}).sort({'_id': -1}).exec(function(err, products) {
	            if (err) {
	                return next(err);
	            }
	            res.json(products);
	        });
        });
    },

    updateProduct: function(req, res, next) {
        Product.findOne({
            _id: req.body._id
        }, function(err, product) {
            if (!err) {
                product.code = req.body.code,
                    product.name = req.body.name,
                    product.minQuantity = req.body.minQuantity,
                    product.price = req.body.price,
                    product.activeState = req.body.activeState,

                    product.save(function(err) {
                        if (err) {
                            console.log('error : ' + error);
                            return next(err);
                        }
			        	Product.find({}).sort({'_id': -1}).exec(function(err, products) {
				            if (err) {
				                return next(err);
				            }
				            res.json(products);
				        });
                    });
            }
        });


    },


    deleteProduct: function(req, res, next) {
        Product.remove({
            _id: req.params.product_id
        }, function(err, todo) {
            if (err) {
                return next(err);
            }
        	Product.find({}).sort({'_id': -1}).exec(function(err, products) {
	            if (err) {
	                return next(err);
	            }
	            res.json(products);
	        });
        });
    }
};
