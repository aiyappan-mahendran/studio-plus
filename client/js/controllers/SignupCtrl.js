angular.module('SignupCtrl', []).controller('SignupController', function($scope, $http, $location, Auth) {
	$scope.user = {};
	$scope.userRoles = routingConfig.userRoles;
	$scope.signup = function() {
		Auth.signup({
			username : $scope.user.username,
			password : $scope.user.password,
			role : $scope.user.role
		}, function() {
			$location.path('/home');
		}, function(err) {
			// $rootScope.error = err;
			$location.url('/');
		});
	};
});
