angular.module("signup").controller("signupController", ["$scope", "$location", "signupService", "loginService", function ($scope, $location, signupService, loginService) {
    $scope.hideFailMessage = true;
    $scope.hideWaitMessage = true;

    if (loginService.isUserLoggedIn()) {
        $location.path("/");
    }

    $scope.signup = function () {
        $scope.hideWaitMessage = false;
        $scope.hideFailMessage = true;

        var user = {
            firstName: $scope.customer.firstName,
            lastName: $scope.customer.lastName,
            email: $scope.customer.email,
            password: $scope.customer.password,
            phone: $scope.customer.phone,
            address: $scope.customer.address,
            postalCode: $scope.customer.postalCode,
            city: $scope.customer.city,
            role: "Customer"
        };


        signupService.signup(user).then(function (response) {
            loginService.login({email: $scope.customer.email, password: $scope.customer.password})
        }, function (response) {
            $scope.hideWaitMessage = true;
            $scope.hideFailMessage = false;
        });
    }
}]);
