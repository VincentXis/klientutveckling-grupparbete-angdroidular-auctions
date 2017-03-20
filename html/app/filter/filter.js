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

angular.module("appfilter").filter("completedAuctions", function () {
   return function (auctions, completedAuctions) {
       var filerAuctions = [];
       angular.forEach(auctions, function (auction) {
           var found = false;
           angular.forEach(completedAuctions, function (compAuction) {
               if (compAuction.id == auction.id)  {
                   found = true;
               }
           });
           if (!found) {
               filerAuctions.push(auction);
           }
       });
       return filerAuctions;
   }
});

angular.module("appfilter").filter("auctionsDatesValid", function () {
    return function (auctions) {
        var filterAuctions = [];
        angular.forEach(auctions, function (auction) {
            var startDate = new Date(auctions.startTime);
            var endDate = new Date(auction.endTime);
            var today = new Date();

            if (startDate <= today && endDate >= today) {
                filterAuctions.push(auction);
            }
        });

        return filterAuctions;
    }
});