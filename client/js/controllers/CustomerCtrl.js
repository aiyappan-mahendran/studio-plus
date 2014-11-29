var app = angular.module('CustomerCtrl', []);

app.controller('CustomerController', function($scope, $http, MenuConfig, modalService){

	$scope.formData = {
	    name: '',
	    code: '',
	    mobileNo: '',
	    phoneNo: '',
	    address: '',
	    location: '',
	    state: '',
	    emailId: '',
	    activeState: ''
	};


	$scope.fields = [{
	    name: 'name',
	    title: 'Name',
	    required: true,
	    placeholder: 'Enter customer name',
	    type: {
	        view: 'input'
	    }
	}, {
	    name: 'code',
	    title: 'Code',
	    required: true,
	    placeholder: 'Enter customer code',
	    type: {
	        view: 'input'
	    }
	}, {
	    name: 'mobileNo',
	    title: 'MobileNo',
	    required: true,
	    placeholder: 'Enter MobileNo',
	    type: {
	        view: 'input'
	    }
	}, {
	    name: 'phoneNo',
	    title: 'Phone',
	    required: true,
	    placeholder: 'Enter Phone',
	    type: {
	        view: 'input'
	    }
	}, {
	    name: 'address',
	    title: 'Address',
	    required: true,
	    placeholder: 'Enter address',
	    type: {
	        view: 'input'
	    }
	}, {
	    name: 'location',
	    title: 'Location',
	    required: true,
	    placeholder: 'Enter location',
	    type: {
	        view: 'input'
	    }
	}, {
	    name: 'state',
	    title: 'State',
	    required: true,
	    placeholder: 'Enter state',
	    type: {
	        view: 'input'
	    }
	}, {
	    name: 'emailId',
	    title: 'Email',
	    required: true,
	    placeholder: 'Enter EmailId',
	    type: {
	        view: 'input'
	    }
	}, {
	    name: 'activeState',
	    title: 'Active state',
	    required: true,
	    placeholder: 'Current active state',
	    type: {
	        view: 'input'
	    }
	}];

	$scope.form = {
	    insertForm: {
	        heading: 'Add new customer',
	        submitLabel: 'Send For Approval',
	        cancelLabel: 'Cancel'
	    },
	    updateForm: {
	        heading: 'Update customer',
	        submitLabel: 'Send For Approval',
	        cancelLabel: 'Cancel',
			searchLabel: 'Search'	    	
	    },
	    listForm: {
	    	heading: 'Customers List'
	    }
	};

	//FIXME: Pass param as customer to retrive only those menu items
	MenuConfig.getAll(function(response){
		for (var i = 0; i < response.length; i++) {
			if (response[i].id==='Customer'){
				$scope.menus = response[i].items;
				break;
			}
		};
		
	});

	$http.get('/api/customers')
		.success(function(data) {
			$scope.listItems = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
	$scope.create = function() {
		$http.post('/api/Customers', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.listItems = data;
				$scope.$parent.$broadcast('CUSTOMER_CHANGED', data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		toastr.success('Customer added successfully');
	};

	$scope.update = function() {
		$http.put('/api/customers', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.listItems = data;
				$scope.$parent.$broadcast('CUSTOMER_CHANGED', data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		toastr.success('Customer updated successfully');
	};
	
	$scope.delete = function(id) {
		$http.delete('/api/Customers/' + id)
			.success(function(data) {
				$scope.listItems = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.search = function(){

		var modalOptions = {
            headerText: 'Search Customer',
            bodyText: 'Select a customer to update',
            dataItems: $scope.listItems
        };

        modalService.showModal({}, modalOptions).then(function (result) {
            $scope.formData = angular.copy(result[0]);
        });
	};
});
