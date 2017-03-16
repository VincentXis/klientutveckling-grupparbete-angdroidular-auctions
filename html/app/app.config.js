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
        .otherwise({template: "<main></main>"});
    $locationProvider.html5Mode(true);
}]);

