angular.module("admin").controller("adminController", ["$scope", "$location", "$q", "loginService", "auctionService", "supplierService", function ($scope, $location, $q, loginService, auctionService, supplierService) {
    $scope.completedAuctions = [];

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
        })
    });


}]);
