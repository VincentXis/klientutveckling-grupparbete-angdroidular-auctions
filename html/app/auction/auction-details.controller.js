angular.module("auction").controller("auctionDetailsController", ["$scope", "$routeParams", "auctionService","bidService", function ($scope, $routeParams, auctionService, bidService) {
    $scope.auction = {};
    $scope.bids= [];
    auctionService.getAuctionById($routeParams.id).then(function (response) {
        $scope.auction = response.data;
        bidService.getBids($routeParams.id).then(function(bidResponse){
            $scope.bids = bidResponse.data;
        })
    });

}]);
