angular.module("admin").controller("adminController", ["$scope", "$location", "loginService", function ($scope, $location, loginService) {
    if(!loginService.isUserAdmin() || !loginService.isUserLoggedIn()) {
        $location.path("/");
    }
}]);
