var app = angular.module('CustomerCtrl', []);

app.controller('CustomerController', function($scope, $http){
	$scope.test='hello world';
	
	// when landing on the page, get all products and show them
	$http.get('/api/customers')
		.success(function(data) {
			$scope.customers = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
	$scope.createCustomer = function() {
		$http.post('/api/Customers', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.customers = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	// delete a todo after checking it
	$scope.deleteCustomer = function(id) {
		$http.delete('/api/Customers/' + id)
			.success(function(data) {
				$scope.customers = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
});
