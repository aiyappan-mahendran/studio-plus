angular.module('controllers')
.controller('NavController', function($scope, Auth, ConfigFactory) {
	$scope.user = Auth.user;
	$scope.userRoles = Auth.userRoles;
	$scope.accessLevels = Auth.accessLevels;
	ConfigFactory.getConfig('config/menu_config.json',function(response){
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