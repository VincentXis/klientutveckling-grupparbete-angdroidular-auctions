angular.module("auction").controller("auctionListController", ["$scope", "$routeParams", "auctionService", function ($scope, $routeParams, auctionService) {
    var auctions = [];
    $scope.limitByCategory = "";
    $scope.limitBySearch = "";
    $scope.auctionId = "";

    auctionService.getAuction().then(function (response) {
        auctions = response.data;

        $scope.limitByCategory = $routeParams.category;
        $scope.limitBySearch= $routeParams.search;

        $scope.auctions = auctions;
    });

    $scope.goToAuctionPage = function(id){
        $scope.auctionId = id;
        window.location = "/auction/" + $scope.auctionId;
    }
}]);

