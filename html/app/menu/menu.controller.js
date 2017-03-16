angular.module("app").controller('menuController', ["$scope", "$rootScope", "$location", "categoryService", "loginService", function ($scope, $rootScope, $location, categoryService, loginService) {
    $scope.admin = false;
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


    $scope.logout = function () {
        loginService.logout();
    };


    $scope.search = function () {
        $location.path("/auctions/search/" + $scope.searchQuery);
    };

    $scope.$watch(function () {
        return loginService.isUserLoggedIn();
    }, function (newValue, oldValue) {
        if (newValue) {
            $scope.loggedIn = true;
            $scope.admin = loginService.isUserAdmin();
        } else {
            $scope.loggedIn = false;
            $scope.admin = false;
        }
    });

    $scope.$watch(function () {
        return loginService.getUserFullName();
    }, function (newValue, oldValue) {
        $scope.userFullName = newValue;
    })




}]);
