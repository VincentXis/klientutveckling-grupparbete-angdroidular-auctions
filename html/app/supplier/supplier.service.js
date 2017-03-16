angular.module("supplier").factory("supplierService", ["$http", function ($http) {
    return {
        getSupplierById: function (id) {
            return $http.get("http://nackademiska-api.azurewebsites.net/api/supplier/" + id);
        }
    }
}]);
