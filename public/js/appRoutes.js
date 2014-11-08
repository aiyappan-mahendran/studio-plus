angular.module('appRoutes', ['ngResource', 'ui.router']).config(
function($stateProvider, $urlRouterProvider) {

	//================================================
	// Check if the user is connected
	//================================================
	
	var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
			// Initialize a new promise
			var deferred = $q.defer();
	
			// Make an AJAX call to check if the user is logged in
			$http.get('/loggedin').success(function(user) {
				// Authenticated
				if (user !== '0')
					$timeout(deferred.resolve, 0);
	
				// Not Authenticated
				else {
					//$rootScope.message = 'You need to log in.';
					$timeout(function() {
						deferred.reject();
					}, 0);
					// $location.url('/login');
					$location.url('/login');
				}
			});
	
			return deferred.promise;
		};
	

	//================================================
	// Add an interceptor for AJAX errors
	//================================================
	 /*
	 $httpProvider.responseInterceptors.push(function($q, $location) {
			  return function(promise) {
				  return promise.then(
				  // Success: just return the response
				  function(response) {
					  return response;
				  },
				  // Error: check the error status to get only the 401
				  function(response) {
					  if (response.status === 401)
						  $location.url('/');
					  return $q.reject(response);
				  });
			  }
		  });*/
	 
	//================================================
	$urlRouterProvider.otherwise('/login');
	$stateProvider

	// home page
	.state('login', {
		url: '/login',
		templateUrl : 'views/login.html',
		controller : 'LoginController'
	}).state('home', {
		url: '/home',
		templateUrl : 'views/home.html',
		controller : 'MainController',
		 resolve : {
			 loggedin : checkLoggedin
		 }
	}).state('products', {
		url: '/products',
		templateUrl : 'views/product.html',
		controller : 'ProductController',
		 resolve : {
			 loggedin : checkLoggedin
		 }
	}).state('signup', {
		url: '/signup',
		templateUrl : 'views/signup.html',
		controller : 'SignupController'
	});
	//commented because ui-viewer is not working with the following line
	// $locationProvider.html5Mode(true);

})
.run(function($rootScope, $http) {
	// $rootScope.message = '';

	// Logout function is available in any pages
	$rootScope.logout = function() {
		// $rootScope.message = 'Logged out.';
		$http.post('/logout');
	};
});
