/* App module */


var app = angular.module('huddle', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.
        when('/', {
          templateUrl: '/partials/home.html',
          controller: 'homeCtrl'
        }).
        when('/create', {
          templateUrl: 'partials/create.html',
          controller: 'createHuddleCtrl'
        }).
        otherwise({
          redirectTo: '/test'
        });
}]);
