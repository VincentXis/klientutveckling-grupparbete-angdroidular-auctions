angular.module("app").config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            template: "<main></main>"
        })
        .otherwise({template: "<error404></error404>"});
    $locationProvider.html5Mode(true);
}]);

