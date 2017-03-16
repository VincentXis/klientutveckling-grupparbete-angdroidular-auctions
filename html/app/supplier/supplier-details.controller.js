angular.module("supplier").controller("supplierDetailsController", ["$scope", "$routeParams", "auctionService", function ($scope, $routeParams, auctionService) {
    $scope.supplier = {};

    supplierService.getSupplierById($routeParams.id).then(function (response) {
        $scope.supplier = response.data;
    });
}]);
