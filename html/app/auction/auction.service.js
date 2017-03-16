angular.module("auction").factory("auctionService", ["$http", function ($http) {
    return {
        getAuction: function () {
            return $http.get("http://nackademiska-api.azurewebsites.net/api/auction");
        },

        getAuctionById: function (id) {
            return $http.get("http://nackademiska-api.azurewebsites.net/api/auction/" + id);
        },

        getCompletedAuctions: function () {
            return $http.get("http://nackademiska-api.azurewebsites.net/api/auction/completed");
        }
    }
}]);
