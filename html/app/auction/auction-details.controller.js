angular.module("auction").controller("auctionDetailsController", ["$scope", "$routeParams","$location", "auctionService","bidService", function ($scope, $routeParams,$location ,auctionService, bidService) {
    $scope.auction = {};
    $scope.bids= [];
    auctionService.getAuctionById($routeParams.id).then(function (response) {
        $scope.auction = response.data;
        bidService.getBids($routeParams.id).then(function(bidResponse){
            $scope.bids = bidResponse.data;
            $scope.auction.bidPrice = bidResponse.data[bidResponse.data.length - 1].bidPrice;
        })
    });
    showSupplier = function(){
        $location.path("/supplier/"+ $scope.auction.supplierId )
    }

}]);
