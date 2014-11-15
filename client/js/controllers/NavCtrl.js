angular.module('NavCtrl', [])
.controller('NavController', function($scope, Auth) {
	$scope.user = Auth.user;
	$scope.userRoles = Auth.userRoles;
	$scope.accessLevels = Auth.accessLevels;

	
	$scope.logout = function() {
			Auth.logout(function() {
				// $location.path('/login');
			}, function() {
				$rootScope.error = "Failed to logout";
			});
	};
	
}); 