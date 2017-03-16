angular.module("login").factory("loginService", ["$http", "$location", "$rootScope", function ($http, $location, $rootScope) {
    var userData = {};
    var userLoggedIn = false;
    $rootScope.loginLocation = "/";

    return {
        login: function (user) {
            return $http.post("http://nackademiska-api.azurewebsites.net/api/account/login", user).then(function (response) {
                userData = response.data;
                userLoggedIn = true;

                if ($rootScope.loginLocation.indexOf("login") == -1) {
                    $location.path($rootScope.loginLocation);
                } else {
                    $location.path("/");
                }

            }, function (response) {
                userData = {};
                userLoggedIn = false;
                $location.path("/login/fail");
            });
        },

        logout: function () {
            userData = {};
            userLoggedIn = false;
            $location.path("/");
        },

        isUserAdmin: function () {
            return userData.role == "Administrator";
        },

        isUserLoggedIn: function () {
            return userLoggedIn;
        },

        getLoggedInUser: function () {
            return userData;
        },

        getUserFullName: function () {
            return userData.firstName + " " + userData.lastName;
        }
    }
}]);
