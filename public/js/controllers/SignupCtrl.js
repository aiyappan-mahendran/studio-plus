angular.module('SignupCtrl', []).controller('SignupController', function($scope, $http, $location) {

	// This object will be filled by the form
	$scope.user = {};
	$scope.alerts = [];

	// Register the login() function
	$scope.signup = function() {
		$http.post('/signup', {
			email : $scope.user.username,
			password : $scope.user.password,
		}).success(function(user) {
			// No error: authentication OK
			// $rootScope.message = 'Authentication successful!';
			$location.url('/home');
		}).error(function() {
			// Error: authentication failed
			// $rootScope.message = 'Authentication failed.';
			$location.url('/');
			// $scope.alert = {
				// type : 'danger',
				// msg : 'Username or password does not exist'
			// };
		});
	};

	$scope.closeAlert = function() {
		$scope.alert = {};
	};
});
