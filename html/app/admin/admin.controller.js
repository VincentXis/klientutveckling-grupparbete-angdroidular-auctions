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
        $q.all(promises).then(function success(data) {
            console.log(data);
        })
    });


}]);
