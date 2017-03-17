angular.module("admin").controller("adminController", ["$scope", "$location", "$q", "$filter", "loginService", "auctionService", "supplierService", function ($scope, $location, $q, $filter, loginService, auctionService, supplierService) {
    $scope.completedAuctions = [];
    $scope.perMonth = [];

    if(!loginService.isUserAdmin() || !loginService.isUserLoggedIn()) {
        $location.path("/");
    }

    auctionService.getCompletedAuctions().then(function (response) {
        $scope.completedAuctions = response.data;
        var promises = [];
        angular.forEach($scope.completedAuctions, function (auction) {
            promises.push(supplierService.getSupplierById(auction.supplierId));
        });

        $q.all(promises).then(function (response) {
            for (var i = 0; i < $scope.completedAuctions.length; i++) {
                $scope.completedAuctions[i].supplier = response[i].data;
            }
            var totalSales = 0;
            var totalTurnOver = 0;
            angular.forEach($scope.completedAuctions, function (auction) {
                var endMonth = $filter('date')(auction.endTime, "MMMM y");
                var added = false;
                angular.forEach($scope.perMonth, function (month) {
                    if (month.endMonth == endMonth) {
                        added = true;
                        month.sales += (auction.buyNowPrice * auction.supplier.commission);
                        month.turnOver += auction.buyNowPrice;
                        totalSales += (auction.buyNowPrice * auction.supplier.commission);
                        totalTurnOver += auction.buyNowPrice;
                    }
                });
                if (!added) {
                    $scope.perMonth.push({
                        endMonth: endMonth,
                        turnOver: auction.buyNowPrice,
                        sales: (auction.buyNowPrice * auction.supplier.commission)
                    });
                    totalSales += (auction.buyNowPrice * auction.supplier.commission);
                    totalTurnOver += auction.buyNowPrice;
                }
            });

            $scope.perMonth.push({
                endMonth: "Total",
                turnOver: totalTurnOver,
                sales: totalSales
            });


        });


    });


}]);
