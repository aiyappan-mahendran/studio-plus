angular.module('appRoutes', ['ngResource', 'ui.router']).config(
function($stateProvider, $urlRouterProvider) {

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
		controller : 'MainController'
	}).state('products', {
		url: '/products',
		templateUrl : 'views/product.html',
		controller : 'ProductController'
	}).state('customers', {
		url: '/customer',
		templateUrl : 'views/customer.html',
		controller : 'CustomerController'		
	}).state('signup', {
		url: '/signup',
		templateUrl : 'views/signup.html',
		controller : 'SignupController'
	});
	//commented because ui-viewer is not working with the following line
	// $locationProvider.html5Mode(true);

});
