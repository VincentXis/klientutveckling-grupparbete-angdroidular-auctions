angular.module("auction").controller("auctionDetailsController", ["$scope", "$routeParams", "auctionService", function ($scope, $routeParams, auctionService) {
    $scope.auction = {};

    auctionService.getAuctionById($routeParams.id).then(function (response) {
        $scope.auction = response.data;
    });

}]);
