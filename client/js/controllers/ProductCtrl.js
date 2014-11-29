var app = angular.module('ProductCtrl', []);

app.controller('ProductController', function($scope, $http, MenuConfig, modalService){
	
	$scope.formData = {
	    name: '',
	    code: '',
	    minQuantity: '',
	    price: '',
	    activeState: ''
	};

	$scope.fields = [{
	    name: 'name',
	    title: 'Product name',
	    required: true,
	    placeholder: 'Enter product name',
	    type: {
	        view: 'input'
	    }
	},{
	    name: 'code',
	    title: 'Code',
	    required: true,
	    placeholder: 'Enter product code',
	    type: {
	        view: 'input'
	    }
	},{
	    name: 'minQuantity',
	    title: 'Product quantity',
	    required: true,
	    placeholder: 'Enter product quantity',
	    type: {
	        view: 'input'
	    }
	},{
	    name: 'price',
	    title: 'Price',
	    required: true,
	    placeholder: 'Enter product price',
	    type: {
	        view: 'input'
	    }
	},{
	    name: 'activeState',
	    title: 'Active state',
	    required: true,
	    placeholder: 'Current active state',
	    type: {
	        view: 'input'
	    }
	}
	];

	$scope.form = {
	    insertForm: {
	        heading: 'Add new products',
	        submitLabel: 'Send For Approval',
	        cancelLabel: 'Cancel'
	    },
	    updateForm: {
	        heading: 'Update products',
	        submitLabel: 'Send For Approval',
	        cancelLabel: 'Cancel',
			searchLabel: 'Search'	    	
	    },
	    listForm: {
	    	heading: 'Products List'
	    },
	    deleteForm: {
	    	heading: 'Delete Product',
	    	submitLabel: 'Delete',
	        cancelLabel: 'Cancel',
	        searchLabel: 'Search'
	    }
	};

	//FIXME: Pass param as product to retrive only those menu items
	MenuConfig.getAll(function(response){
		for (var i = 0; i < response.length; i++) {
			if (response[i].id==='Product'){
				$scope.menus = response[i].items;
				break;
			}
		};
		
	});

	$http.get('/api/products')
		.success(function(data) {
			$scope.listItems = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
	$scope.create = function() {
		$http.post('/api/products', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.listItems = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		toastr.success('Product added successfully');
	};

	$scope.update = function() {
		$http.put('/api/products', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.listItems = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		toastr.success('Product updated successfully');
	};
	
	$scope.delete = function() {
		$http.delete('/api/products/' + $scope.formData._id)
			.success(function(data) {
				$scope.listItems = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.search = function(){
		var modalOptions = {
            headerText: 'Search Product',
            bodyText: 'Select a product to update',
            dataItems: $scope.listItems
        };

        modalService.showModal({}, modalOptions).then(function (result) {
            $scope.formData = angular.copy(result[0]);
        });
	};

});
