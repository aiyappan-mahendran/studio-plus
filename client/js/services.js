'use strict';

angular.module('services', ['ngCookies'])
.factory('Auth', function($http, $cookieStore){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    return {
        authorize: function(accessLevel, role) {
            if(role === undefined) {
                role = currentUser.role;
            }

            return accessLevel.bitMask & role.bitMask;
        },
        isLoggedIn: function(user) {
            if(user === undefined) {
                user = currentUser;
            }
            return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
        },
        signup: function(user, success, error) {
            $http.post('/signup', {
				email : user.username,
				password : user.password,
				role: user.role
			}).success(function(user) {
				changeUser(user);
				success(user);
			}).error(error);
        },
        login: function(user, success, error) {
            $http.post('/login', {
			email : user.username,
			password : user.password,
			}).success(function(user) {
				changeUser(user);
				success(user);
			}).error(error);
        },
        logout: function(success, error) {
            $http.post('/logout').success(function(){
                changeUser({
                    username: '',
                    role: userRoles.public
                });
                success();
            }).error(error);
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
})
.factory('MenuConfig', function($http) {
    return {
        getAll: function(success) {
            $http.get('config/menu_config.json').success(function(response) {
                success(response);
            }); 
        }
    }
});
/*
angular.module('angular-client-side-auth')
.factory('Users', function($http) {
    return {
        getAll: function(success, error) {
            $http.get('/users').success(success).error(error);
        }
    };
});
*/