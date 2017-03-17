angular.module("auction").controller("auctionListController", ["$scope", "$routeParams", "$location", "$q", "auctionService", "bidService", function ($scope, $routeParams, $location, $q, auctionService, bidService) {
    var auctions = [];
    var bids = [];
    $scope.limitByCategory = "";
    $scope.limitBySearch = "";
    $scope.auctionId = "";

    auctionService.getAuction().then(function (response) {
        auctions = response.data;

        $scope.limitByCategory = $routeParams.category;
        $scope.limitBySearch = $routeParams.search;


        auctionService.getCompletedAuctions().then(function (response) {
            var promises = [];

            angular.forEach(auctions, function (auction) {
                promises.push(bidService.getBids(auction.id));
            });
            $q.all(promises).then(function (response) {
                for (var i = 0; i < auctions.length; i++) {
                    auctions[i].bids = response[i].data;
                }
                console.log(auctions);

                $scope.auctions = auctions;
            });

            $scope.compAuctions = response.data;
        });


    });

    $scope.goToAuctionPage = function (id) {
        $location.path("/auction/" + id);
    }
}]);

