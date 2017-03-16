angular.module("appfilter").filter("limitAuctions", function () {
    return function (auctions, limitByCategory, limitBySearch) {
        var filterAuctions = [];
        if (limitBySearch) {
            angular.forEach(auctions, function (auction) {
                if (auction.name.toLowerCase().indexOf(limitBySearch) >= 0 || auction.description.toLowerCase().indexOf(limitBySearch) >= 0) {
                    filterAuctions.push(auction);
                }
            })
        } else if (limitByCategory) {
            angular.forEach(auctions, function (product) {
                if (product.categoryId == limitByCategory) {
                    filterAuctions.push(product);
                }
            })
        } else {
            filterAuctions = auctions;
        }
        return filterAuctions;
    }
});