angular.module("auction").controller("auctionDetailsController", ["$scope", "$routeParams", "auctionService", function ($scope, $routeParams, auctionService) {
    $scope.product = {};
    $scope.quantity = 1;

    auctionService.getAuctionById($routeParams.id).then(function (response) {
        $scope.product = response.data;
    });

}]);
