var app = angular.module('CustomerCtrl', []);

app.controller('CustomerController', function($scope, $http, MenuConfig, modalService, Auth){

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
	    selected: true,
	    type: {
	        view: 'text',
		    minLength:3,
		    maxLength:20
	    }
	}, {
	    name: 'code',
	    title: 'Code',
	    required: true,
	    placeholder: 'Enter customer code',
	    selected: true,
	    type: {
	        view: 'text',
		    minLength:3,
		    maxLength:20
	    }
	}, {
	    name: 'mobileNo',
	    title: 'MobileNo',
	    required: true,
	    placeholder: 'Enter MobileNo',
	    selected: true,
	    type: {
	        view: 'number'
	    }
	}, {
	    name: 'phoneNo',
	    title: 'Phone',
	    required: true,
	    placeholder: 'Enter Phone',
	    selected: true,
	    type: {
	        view: 'number'
	    }
	}, {
	    name: 'address',
	    title: 'Address',
	    required: true,
	    placeholder: 'Enter address',
	    selected: true,
	    type: {
	        view: 'text',
		    minLength:3,
		    maxLength:20
	    }
	}, {
	    name: 'location',
	    title: 'Location',
	    required: true,
	    placeholder: 'Enter location',
	    selected: true,
	    type: {
	        view: 'text',
		    minLength:3,
		    maxLength:20
	    }
	}, {
	    name: 'state',
	    title: 'State',
	    required: true,
	    placeholder: 'Enter state',
	    selected: true,
	    type: {
	        view: 'text',
		    minLength:3,
		    maxLength:20
	    }
	}, {
	    name: 'emailId',
	    title: 'Email',
	    required: true,
	    placeholder: 'Enter EmailId',
	    selected: true,
	    type: {
	        view: 'email'
	    }
	}, {
	    name: 'activeState',
	    title: 'Active state',
	    required: false,
	    selected: true,
	    type: {
	        view: 'dropdown',
			options: [  
				{id: 0, name: 'Active'},  
				{id: 1, name: 'InActive'}  
			] 	        
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
	    },
	    deleteForm: {
	    	heading: 'Delete Customer',
	    	submitLabel: 'Delete',
	        cancelLabel: 'Cancel',
	        searchLabel: 'Search'
	    }
	};

	$scope.accessLevels = Auth.accessLevels;
	$scope.myFields = [];

	intialize = function(){
		for (var i in $scope.fields) {
			$scope.myFields.push($scope.fields[i].name);
		}
	}

	intialize();

	$scope.changeColumns = function(value, i) {
	    var index = $scope.myFields.indexOf(value);
	    if (index === -1) {
	        $scope.myFields.splice(i,0,value);
	    } else {
	        $scope.myFields.splice(index, 1);
	    }
	}

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
