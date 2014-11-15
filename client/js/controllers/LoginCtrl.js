angular.module('LoginCtrl', []).controller('LoginController', function($scope, $http, $location, Auth) {
	$scope.user = {};
	$scope.login = function() {
		Auth.login({
			username : $scope.user.username,
			password : $scope.user.password
		}, function(res) {
			$location.path('/home');
		}, function(err) {
			//$rootScope.error = "Failed to login";
			$location.url('/');
		});
	};
});
