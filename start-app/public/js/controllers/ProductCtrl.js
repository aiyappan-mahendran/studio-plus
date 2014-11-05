var app = angular.module('ProductCtrl', []);

app.controller('ProductController', function($scope, $http){
	$scope.test='hello world';
	
	// when landing on the page, get all products and show them
	$http.get('/api/products')
		.success(function(data) {
			$scope.products = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
	$scope.createProduct = function() {
		$http.post('/api/products', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.products = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	// delete a todo after checking it
	$scope.deleteProduct = function(id) {
		$http.delete('/api/products/' + id)
			.success(function(data) {
				$scope.products = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
});
