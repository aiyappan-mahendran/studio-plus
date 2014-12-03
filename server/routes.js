var _ =           require('underscore')
    , path =      require('path')
    , AuthCtrl =  require('./controllers/auth')
    , ProductCtrl =  require('./controllers/productServerCtrl')
	, CustomerCtrl =  require('./controllers/customerServerCtrl')
    , userRoles = require('../client/js/routingConfig').userRoles
    , accessLevels = require('../client/js/routingConfig').accessLevels;

var routes = [

    // Views
    {
        path: '/views/*',
        httpMethod: 'GET',
        middleware: [function (req, res) {
            var requestedView = path.join('./', req.url);
            res.render(requestedView);
        }]
    },

    {
        path: '/config/*',
        httpMethod: 'GET',
        middleware: [function (req, res) {
            var requestedView = path.join('./', req.url);
            res.render(requestedView);
        }]
    },
    
    {
        path: '/api/products',
        httpMethod: 'GET',
        middleware: [ProductCtrl.getAllProducts],
        accessLevel: accessLevels.user
    },

    {
        path: '/api/products',
        httpMethod: 'POST',
        middleware: [ProductCtrl.createProduct],
        accessLevel: accessLevels.user
    },

    {
        path: '/api/products',
        httpMethod: 'PUT',
        middleware: [ProductCtrl.updateProduct],
        accessLevel: accessLevels.user
    },
    
    {
        path: '/api/products/:product_id',
        httpMethod: 'DELETE',
        middleware: [ProductCtrl.deleteProduct],
        accessLevel: accessLevels.admin
    },
    {
        path: '/api/customers',
        httpMethod: 'GET',
        middleware: [CustomerCtrl.getAllCustomers],
        accessLevel: accessLevels.user
    },

    {
        path: '/api/customers',
        httpMethod: 'POST',
        middleware: [CustomerCtrl.createCustomer],
        accessLevel: accessLevels.user
    },

    {
        path: '/api/customers',
        httpMethod: 'PUT',
        middleware: [CustomerCtrl.updateCustomer],
        accessLevel: accessLevels.user
    },
    
    {
        path: '/api/customers/:customer_id',
        httpMethod: 'DELETE',
        middleware: [CustomerCtrl.deleteCustomer],
        accessLevel: accessLevels.admin
    },	
    {
        path: '/login',
        httpMethod: 'POST',
        middleware: [AuthCtrl.login]
    },
    {
        path: '/logout',
        httpMethod: 'POST',
        middleware: [AuthCtrl.logout]
    },
    {
        path: '/signup',
        httpMethod: 'POST',
        middleware: [AuthCtrl.signup]
    },

    // All other get requests should be handled by AngularJS's client-side routing system
    {
        path: '/*', //is it / ?
        httpMethod: 'GET',
        middleware: [function(req, res) {
            var role = userRoles.public, username = '';
            if(req.user) {
                role = req.user.role;
                username = req.user.email;
            }
            res.cookie('user', JSON.stringify({
                'username': username,
                'role': role
            }));
            res.render('index', {
				title : 'Express'
			});
        }]
    }
];

module.exports = function(app, passport) {

    _.each(routes, function(route) {
        route.middleware.unshift(ensureAuthorized);
        var args = _.flatten([route.path, route.middleware]);

        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    });

};

function ensureAuthorized(req, res, next) {
    var role;
    if(!req.user) role = userRoles.public;
    else          role = req.user.role;
    var accessLevel = _.findWhere(routes, { path: req.route.path, httpMethod: req.route.stack[0].method.toUpperCase() }).accessLevel || accessLevels.public;
	
    if(!(accessLevel.bitMask & role.bitMask)) return res.send(403);
    return next();
};