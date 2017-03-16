angular.module("app").controller('menuController', ["$scope", "$rootScope", "$location", "categoryService", function ($scope, $rootScope, $location, categoryService) {

    $scope.categories = [];

    categoryService.getCategories().then(function (response) {
        var categories = response.data;
        angular.forEach(categories, function (category) {
            $scope.categories.push(category)
        })
    });

    $scope.login = function () {
        $rootScope.loginLocation = $location.path();
        $location.path("/login");
    };

    $scope.signup = function () {
        $rootScope.loginLocation = $location.path();
        $location.path("/signup");
    };

    /*
    $scope.logout = function () {
        loginService.logout();
    };
    */

    $scope.search = function () {
        $location.path("/products/search/" + $scope.searchQuery);
    };
    /*
    $scope.$watch(function () {
        return cartService.getCartTotalPrice();
    }, function (newValue, oldValue) {
        $scope.cartTotalPrice = newValue;
    });

    $scope.$watch(function () {
        return loginService.isUserLoggedIn();
    }, function (newValue, oldValue) {
        if (newValue) {
            var user = loginService.getLoggedInUser();
            $scope.loggedIn = true;
        } else {
            $scope.loggedIn = false;
        }
    });

    $scope.$watch(function () {
        return loginService.getUserFullName();
    }, function (newValue, oldValue) {
        $scope.userFullName = newValue;
    })
*   */



}]);
