angular.module("signup").factory("signupService", ["$http", function ($http) {
    return {
        signup: function (user) {
            return $http.post("http://nackademiska-api.azurewebsites.net/api/account", user);
        }
    }
}]);
