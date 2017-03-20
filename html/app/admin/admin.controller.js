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



            /*
            var promisesSupplier = [];
            var promiseBids = [];
            angular.forEach($scope.completedAuctions, function (auction) {
                promisesSupplier.push(supplierService.getAdminSupplierById(auction.supplierId));/*.then(function (suppliers) {
                 auction.supplier = suppliers.data;
                 }));*/
                /*promiseBids.push(bidService.getAdminBids(auction.id));/*.then(function (bids) {
                 auction.winningBid = bids.data[bids.data.length -1].bidPrice;
                 auction.winningDate = bids.data[bids.data.length -1].dateTime;
                 }));
            });

            var promises = [promisesSupplier, promiseBids];

            return $q.all(promises);
            */
    });



}]);
        /*
       $scope.$watchCollection(function () {
           return $scope.completedAuctions;
       }, function (newValue, oldValue) {

           console.log(newValue);

           var totalSales = 0;
           var totalTurnOver = 0;

           angular.forEach(newValue, function (test) {
               var endMonth = $filter('date')(test.dateTime, "MMMM y");
               var added = false;
               angular.forEach($scope.perMonth, function (month) {
                   if (month.endMonth == endMonth) {
                       added = true;
                       month.sales += (test.winningBid * test.supplier.commission);
                       month.turnOver += auction.winningBid;
                       totalSales += (test.winningBid * test.supplier.commission);
                       totalTurnOver += test.winningBid;
                   }
               });
               console.log(test.winningBid);
               if (!added) {
                   $scope.perMonth.push({
                       endMonth: endMonth,
                       turnOver: test.winningBid,
                       sales: (test.winningBid * test.supplier.commission)
                   });
                   totalSales += (test.winningBid * test.supplier.commission);
                   totalTurnOver += test.winningBid;
               }

           });
       });*/

        /*
        $q.all(promiseBids).then(function (response) {
            for (var i = 0; i < $scope.completedAuctions.length; i++) {
                //$scope.completedAuctions[i].bids = response[i].data;
                $scope.completedAuctions[i].winningbid = response[i].data[response[i].data.length-1].bidPrice;
                $scope.completedAuctions[i].winningdate = response[i].data[response[i].data.length-1].dateTime;
            }
        });
        */




            /*
            for (var i = 0; i < $scope.completedAuctions.length; i++) {
                $scope.completedAuctions[i].supplier = response[i].data;
            }
            var totalSales = 0;
            var totalTurnOver = 0;
            var aucitonPromise = [];
            angular.forEach($scope.completedAuctions, function (auction) {
                auctionPromise.push(bidService.getBids(auction.id));


                /*
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

            $q.all(aucitonPromise).then(function (response) {
                for (var i = 0; i < $scope.completedAuctions.length; i++) {
                    $scope.completedAuctions[i].bids = response[i].data;
                    console.log(response);
                }
            });



            $scope.perMonth.push({
                endMonth: "Total",
                turnOver: totalTurnOver,
                sales: totalSales
            });
            */




