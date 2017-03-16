angular.module("supplier").controller("supplierDetailsController", ["$scope", "$routeParams", "supplierService", function ($scope, $routeParams, supplierService) {
    $scope.supplier = {};

    supplierService.getSupplierById($routeParams.id).then(function (response) {
        $scope.supplier = response.data;
    });
}]);
