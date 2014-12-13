angular.module('controllers')
.controller('NavController', function($scope, Auth, MenuConfig) {
	$scope.user = Auth.user;
	$scope.userRoles = Auth.userRoles;
	$scope.accessLevels = Auth.accessLevels;
	MenuConfig.getAll(function(response){
		$scope.menus = response;
	})

	$scope.logout = function() {
			Auth.logout(function() {
				// $location.path('/login');
			}, function() {
				$rootScope.error = "Failed to logout";
			});
	};
	
}); 