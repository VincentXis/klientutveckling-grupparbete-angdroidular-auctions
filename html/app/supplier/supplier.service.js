angular.module("supplier").factory("supplierService", ["$http", function ($http) {
    return {
        getSuppliers: function () {
            return $http.get("http://nackademiska-api.azurewebsites.net/api/supplier/");
        },
        getSupplierById: function (id) {
            return $http.get("http://nackademiska-api.azurewebsites.net/api/supplier/" + id);
        }
    }
}]);
