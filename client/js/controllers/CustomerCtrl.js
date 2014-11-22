var app = angular.module('CustomerCtrl', []);

app.controller('CustomerController', function($scope, $http, MenuConfig){
	$scope.mySelectedItems=[];
	$scope.$on('CREATE_CUSTOMER', function(response, data) {
      $scope.customers = data;
	});
	$scope.removeSelectedElements = function() {
		console.log(JSON.stringify($scope.mySelectedItems));
		for (var i = 0; i < $scope.mySelectedItems.length; i++) {
			$scope.deleteCustomer($scope.mySelectedItems[i]._id);
	    };
	    $scope.mySelectedItems=[];
	};

	//FIXME: Pass param as product to retrive only those menu items
	MenuConfig.getAll(function(response){
		for (var i = 0; i < response.length; i++) {
			if (response[i].id==='Customer'){
				$scope.customerMenus = response[i].items;
				break;
			}
		};
		
	});


	// when landing on the page, get all customers and show them
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
				$scope.$parent.$broadcast('CREATE_CUSTOMER', data);
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
