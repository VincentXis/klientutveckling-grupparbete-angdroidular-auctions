angular.module("app").config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            template: "<main></main>"
        })
        .when("/login", {
            template: "<login></login>"
        })
        .when("/login/:msg", {
            template: "<login></login>"
        })
        .when("/signup", {
            template: "<signup></signup>"
        })
        .when("/auctions", {
            template: "<auction-list></auction-list>"
        })
        .when("/auctions/category/:category", {
            template: "<auction-list></auction-list>"
        })
        .when("/auctions/search/:search", {
            template: "<auction-list></auction-list>"
        })
        .when("/auction/:id", {
            template: "<auction-details></auction-details>"
        })
        .when("/supplier/:id", {
            template: "<supplier-details></supplier-details>"
        })
        .when("/admin", {
            template: "<admin></admin>"
        })
        .otherwise({template: "<main></main>"});
    $locationProvider.html5Mode(true);
}]);

