angular.module("admin").controller("adminController", ["$scope", "$location", "$q", "$filter", "loginService", "auctionService", "supplierService", "bidService", function ($scope, $location, $q, $filter, loginService, auctionService, supplierService, bidService) {
    $scope.completedAuctions = [];
    $scope.perMonth = [];
    $scope.totalSales = 0;
    $scope.totalTurnOver = 0;

    if(!loginService.isUserAdmin() || !loginService.isUserLoggedIn()) {
        $location.path("/");
    }

    auctionService.getCompletedAuctions().then(function (response) {
        $scope.completedAuctions = response.data;


        angular.forEach(response.data, function (auction) {
            supplierService.getSupplierById(auction.supplierId).then(function (supplier) {
                auction.supplier = supplier.data;

                bidService.getBids(auction.id).then(function (bids) {
                    auction.winningBid = bids.data[bids.data.length-1].bidPrice;
                    auction.winningDate = bids.data[bids.data.length-1].dateTime;

                    var endMonth = $filter('date')(auction.winningDate, "MMMM y");
                    var added = false;

                    angular.forEach($scope.perMonth, function (month) {
                        if (month.endMonth == endMonth) {
                            added = true;
                            month.sales += (auction.winningBid * auction.supplier.commission);
                            month.turnOver += auction.winningBid;
                            $scope.totalSales += (auction.winningBid * auction.supplier.commission);
                            $scope.totalTurnOver += auction.winningBid;
                        }
                    });

                    if (!added) {
                        $scope.perMonth.push({
                            endMonth: endMonth,
                            turnOver: auction.winningBid,
                            sales: (auction.winningBid * auction.supplier.commission)
                        });
                        $scope.totalSales += (auction.winningBid * auction.supplier.commission);
                        $scope.totalTurnOver += auction.winningBid;
                    }


            });


            });
        });


    });


}]);



