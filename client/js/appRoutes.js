angular.module('appRoutes', ['ngResource', 'ui.router']).config(
function($stateProvider, $urlRouterProvider) {

	var access = routingConfig.accessLevels;
	
	//================================================
	$urlRouterProvider.otherwise('/login');
	$stateProvider

	// home page
	.state('login', {
		url: '/login',
		templateUrl : 'views/login.html',
		controller : 'LoginController',
		data: {
            access: access.anon
        }
	}).state('home', {
		url: '/home',
		templateUrl : 'views/home.html',
		controller : 'MainController',
		data: {
            access: access.user
        }
	})
    .state('products', {
        url: '/products',
        templateUrl: 'views/products/product_master.html',
        abstract:true,
        controller: 'ProductController', 
        data: {
            access: access.admin
        }
    })
    .state('products.list', {
        url: '',
        templateUrl: 'views/products/product_list.html',
        controller: 'ProductController', 
        data: {
            access: access.admin
        }
    })
    .state('products.create', {
        url: '',
        templateUrl: 'views/products/product_create.html',
        controller: 'ProductController', 
        data: {
            access: access.admin
        }
    })
    .state('products.update', {
        url: '',
        templateUrl: 'views/products/product_update.html',
        controller: 'ProductController', 
        data: {
            access: access.admin
        }
    })
    .state('customers', {
        url: '/customers',
        templateUrl: 'views/customers/customer_master.html',
        abstract:true,
        controller: 'CustomerController', 
        data: {
            access: access.admin
        }
    })
    .state('customers.list', {
        url: '',
        templateUrl: 'views/customers/customer_list.html',
        controller: 'CustomerController', 
        data: {
            access: access.admin
        }
    })
    .state('customers.create', {
        url: '',
        templateUrl: 'views/customers/customer_create.html',
        controller: 'CustomerController', 
        data: {
            access: access.admin
        }
    })
	.state('signup', {
		url: '/signup',
		templateUrl : 'views/signup.html',
		controller : 'SignupController',
		data: {
            access: access.anon
        }
	});
	//commented because ui-viewer is not working with the following line
	// $locationProvider.html5Mode(true);

});
//TBD: add this code to make the url based authentication  
/* 
.run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        
        if(!('data' in toState) || !('access' in toState.data)){
            $rootScope.error = "Access undefined for this state";
            event.preventDefault();
        }
        else if (!Auth.authorize(toState.data.access)) {
            $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
            event.preventDefault();

            if(fromState.url === '^') {
                if(Auth.isLoggedIn()) {
                    $state.go('home');
                } else {
                    $rootScope.error = null;
                    $state.go('login');
                }
            }
        }
    });

}]);*/
