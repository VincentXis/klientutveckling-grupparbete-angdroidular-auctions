angular.module("auction").controller("auctionListController", ["$scope", "$routeParams", "$location", "auctionService", function ($scope, $routeParams, $location, auctionService) {
    var auctions = [];
    $scope.limitByCategory = "";
    $scope.limitBySearch = "";
    $scope.auctionId = "";

    auctionService.getAuction().then(function (response) {
        auctions = response.data;

        $scope.limitByCategory = $routeParams.category;
        $scope.limitBySearch= $routeParams.search;

        auctionService.getCompletedAuctions().then(function (response) {
            $scope.compAuctions = response.data;
            $scope.auctions = auctions;
        });


    });

    $scope.goToAuctionPage = function(id){
        $location.path("/auction/" + id);
    }
}]);

