var app = angular.module('controllers');

app.controller('ProductController', function($scope, $http, ConfigFactory, modalService, Auth) {

    $scope.formData = {
        name: '',
        code: '',
        minQuantity: '',
        price: '',
        activeState: '',
        deliveryDate: ''
    };
    $scope.myFields = [];

    ConfigFactory.getConfig('config/product/fields.json', function(responseJson) {
        $scope.fields = responseJson;
        for (var i in $scope.fields) {
            $scope.myFields.push($scope.fields[i].name);
        }
    });

    ConfigFactory.getConfig('config/product/form.json', function(responseJson) {
        $scope.form = responseJson;
    });

    $scope.accessLevels = Auth.accessLevels;

    $scope.changeColumns = function(value, i) {
        var index = $scope.myFields.indexOf(value);
        if (index === -1) {
            $scope.myFields.splice(i, 0, value);
        } else {
            $scope.myFields.splice(index, 1);
        }
    }


    //FIXME: Pass param as product to retrive only those menu items
    ConfigFactory.getConfig('config/menu_config.json', function(response) {
        for (var i = 0; i < response.length; i++) {
            if (response[i].id === 'Product') {
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
                toastr.success('Product added successfully');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    };

    $scope.update = function() {
        $http.put('/api/products', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                toastr.success('Product updated successfully');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    };

    $scope.delete = function() {
        $scope.formData.activeState = 'Deleted';
        $http.put('/api/products', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                toastr.success('Product deleted successfully');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.search = function() {
        var modalOptions = {
            headerText: 'Search Product',
            bodyText: 'Select a product to update',
            dataItems: $scope.listItems
        };

        modalService.showModal({}, modalOptions).then(function(result) {
            $scope.formData = angular.copy(result[0]);
        });
    };

    $scope.saveColumnHeaders = function() {
        alert($scope.myFields);
    };

});
