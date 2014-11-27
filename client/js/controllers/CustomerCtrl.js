var app = angular.module('CustomerCtrl', []);

app.controller('CustomerController', function($scope, $http, MenuConfig, modalService){
	$scope.mySelectedItems=[];
	$scope.selectedCustomer=[];
	$scope.$on('CUSTOMER_CHANGED', function(response, data) {
      $scope.customers = data;
	});
	$scope.removeSelectedElements = function() {
		for (var i = 0; i < $scope.mySelectedItems.length; i++) {
			$scope.deleteCustomer($scope.mySelectedItems[i]._id);
	    };
	    $scope.mySelectedItems=[];
	};

	$scope.$watch('selectedCustomer', function(newVal, oldVal){
		if (newVal.length>0){
			$scope.formData = newVal[0];
		}
	},true);

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
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
	$scope.createCustomer = function() {
		$http.post('/api/Customers', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.customers = data;
				$scope.$parent.$broadcast('CUSTOMER_CHANGED', data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.updateCustomer = function() {
		$http.put('/api/customers', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.customers = data;
				$scope.$parent.$broadcast('CUSTOMER_CHANGED', data);
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
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.searchCustomer = function(){

		var modalOptions = {
            headerText: 'Search Customer',
            bodyText: 'Select a customer to update',
            dataItems: $scope.customers
        };

        modalService.showModal({}, modalOptions).then(function (result) {
            $scope.formData = angular.copy(result[0]);
        });
	};
});
