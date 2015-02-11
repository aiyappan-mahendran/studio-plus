var app = angular.module('controllers');

app.controller('CustomerController', function($scope, $http, ConfigFactory, modalService, Auth){

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
	$scope.myFields = [];

	ConfigFactory.getConfig('config/customer/fields.json', function(responseJson){
		$scope.fields = responseJson;
		for (var i in $scope.fields) {
			$scope.myFields.push($scope.fields[i].name);
		}
	});

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
	    },
	    deleteForm: {
	    	heading: 'Delete Customer',
	    	submitLabel: 'Delete',
	        cancelLabel: 'Cancel',
	        searchLabel: 'Search'
	    }
	};

	$scope.accessLevels = Auth.accessLevels;

	$scope.changeColumns = function(value, i) {
	    var index = $scope.myFields.indexOf(value);
	    if (index === -1) {
	        $scope.myFields.splice(i,0,value);
	    } else {
	        $scope.myFields.splice(index, 1);
	    }
	}

	//FIXME: Pass param as customer to retrive only those menu items
	ConfigFactory.getConfig('config/menu_config.json',function(response){
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
				toastr.success('Customer updated successfully');
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		
	};
	
	$scope.delete = function() {
		$scope.formData.activeState='Deleted';
		$http.put('/api/Customers', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				toastr.success('Customer deleted successfully');
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
