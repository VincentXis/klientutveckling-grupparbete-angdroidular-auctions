angular.module("login").factory("loginService", ["$http", "$location", "$rootScope", function ($http, $location, $rootScope) {
    var userData = {};
    var userLoggedIn = false;
    $rootScope.loginLocation = "/";

    return {
        login: function (user) {
            return $http.post("http://nackademiska-api.azurewebsites.net/api/account/login", user).then(function (response) {
                userData = response.data;
                userLoggedIn = true;

                if ($rootScope.loginLocation.indexOf("login") == -1 ) {
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

        isUserLoggedIn: function () {
            return userLoggedIn;
        },

        getLoggedInUser: function () {
            return userData;
        },
        /*
        updateUserDetails: function (user) {
            if (userLoggedIn) {
                $http.put("http://nackbutik.azurewebsites.net/api/customer/" + userId, user).then(function (response) {
                    userData.firstName = user.firstName;
                    userData.lastName = user.lastName;
                    userData.email = user.email;
                    userData.phone = user.phone;
                    userData.city = user.city;
                    userData.postalCode = user.postalCode;
                    userData.address = user.address;

                    $location.path("/customer");
                }, function (response) {
                    $location.path("/customer/edit/fail");
                })
            }
        },
        */
        getUserFullName: function () {
            return userData.firstName + " " + userData.lastName;
        }
    }
}]);
