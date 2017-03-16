angular.module("admin").controller("adminController", ["$scope", "$location", "loginService", "auctionService", function ($scope, $location, loginService, auctionService) {
    $scope.completedAuctions = [];

    if(!loginService.isUserAdmin() || !loginService.isUserLoggedIn()) {
        $location.path("/");
    }

    auctionService.getCompletedAuctions().then(function (response) {
        $scope.completedAuctions = response.data;
    });


}]);
