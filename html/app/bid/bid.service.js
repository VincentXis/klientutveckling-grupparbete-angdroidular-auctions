angular.module("bid").factory("bidService", ["$http", function ($http) {
    return {
        newBid: function (auctionId, customerId, bidPrice) {
            var bid = {
                auctionId: auctionId,
                customerId: customerId,
                bidPrice: bidPrice
            };
            return $http.post("http://nackademiska-api.azurewebsites.net/api/bid", bid);
        },

        getBids: function (auctionId) {
            return $http.get("http://nackademiska-api.azurewebsites.net/api/bid/" + auctionId);
        }
    }
}]);
