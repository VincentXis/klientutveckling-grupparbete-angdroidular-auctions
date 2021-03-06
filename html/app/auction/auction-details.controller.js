angular.module("auction").controller("auctionDetailsController", ["$scope", "$routeParams","$location", "auctionService","bidService", "loginService", function ($scope, $routeParams,$location ,auctionService, bidService, loginService) {
    $scope.auction = {};
    $scope.bids= [];
    $scope.showError = false;
    auctionService.getAuctionById($routeParams.id).then(function (response) {
        $scope.auction = response.data;
        bidService.getBids($routeParams.id).then(function(bidResponse){

            $scope.bids = bidResponse.data;

            if (bidResponse.data.length > 0) {
                $scope.auction.bidPrice = bidResponse.data[bidResponse.data.length - 1].bidPrice;
            } else {
                $scope.auction.bidPrice = 0;
            }

        })
    });
    $scope.showSupplier = function(){
        $location.path("/supplier/"+ $scope.auction.supplierId )
    };

    $scope.bid = function(bidPrice){
        $scope.showError = false;
        if(!loginService.isUserLoggedIn()){
            $location.path("/login/req");
        }
        else{
            var userId = loginService.getLoggedInUser().id;
            bidService.newBid($scope.auction.id, userId, bidPrice).then(function (response) {
                $location.path("/thankyou");

            }, function (response) {
                    $scope.showError = true;
            }

            )
        }
    }

    $scope.validateBid = function(){
        if($scope.newPrice > $scope.auction.bidPrice){
            return false;
        }else{
            return true;
        }
    }

}]);
