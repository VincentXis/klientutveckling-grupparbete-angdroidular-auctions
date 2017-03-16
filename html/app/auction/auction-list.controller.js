angular.module("auction").controller("auctionListController", ["$scope", "$routeParams", "auctionService", function ($scope, $routeParams, auctionService) {
    var auctions = [];
    $scope.limitByCategory = "";
    $scope.limitBySearch = "";

    auctionService.getAuction().then(function (response) {
        auctions = response.data;

        $scope.limitByCategory = $routeParams.category;
        $scope.limitBySearch= $routeParams.search;

        $scope.auctions = auctions;
    });

}]);

