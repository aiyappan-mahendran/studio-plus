var app = angular.module('ProductCtrl', []);

app.controller('ProductController', function($scope, $http, MenuConfig){
	$scope.mySelectedItems=[];
	$scope.selectedProduct=[];
	
	$scope.$on('CREATE_PRODUCT', function(response, data) {
      $scope.products = data;
	});
	
	$scope.removeSelectedElements = function() {
		for (var i = 0; i < $scope.mySelectedItems.length; i++) {
			$scope.deleteProduct($scope.mySelectedItems[i]._id);
	    };
	    $scope.mySelectedItems=[];
	};
	
	$scope.$watch('selectedProduct', function(newVal, oldVal){
		if (newVal.length>0){
			$scope.formData = newVal[0];

		}
	},true);

	
	//FIXME: Pass param as product to retrive only those menu items
	MenuConfig.getAll(function(response){
		for (var i = 0; i < response.length; i++) {
			if (response[i].id==='Product'){
				$scope.productMenus = response[i].items;
				break;
			}
		};
		
	});

	// when landing on the page, get all products and show them
	$http.get('/api/products')
		.success(function(data) {
			$scope.products = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
	$scope.createProduct = function() {
		$http.post('/api/products', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.products = data;
				$scope.$parent.$broadcast('CREATE_PRODUCT', data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.updateProduct = function() {
		$http.put('/api/products', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.products = data;
				$scope.$parent.$broadcast('CREATE_PRODUCT', data);
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
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
});
