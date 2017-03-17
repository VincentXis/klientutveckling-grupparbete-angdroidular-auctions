angular.module("auction").controller("auctionListController", ["$scope", "$routeParams", "$location", "$q", "auctionService", "bidService", function ($scope, $routeParams, $location, $q, auctionService, bidService) {
    var auctions = [];
    $scope.limitByCategory = "";
    $scope.limitBySearch = "";
    $scope.auctionId = "";

    auctionService.getAuction().then(function (response) {
        auctions = response.data;

        $scope.limitByCategory = $routeParams.category;
        $scope.limitBySearch = $routeParams.search;


        auctionService.getCompletedAuctions().then(function (response) {
            $scope.auctions = auctions;
            $scope.compAuctions = response.data;
        });
    });

    $scope.goToAuctionPage = function (id) {
        $location.path("/auction/" + id);
    }
}]);

