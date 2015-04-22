/* App module */


var app = angular.module('huddle', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.
        when('/', {
          templateUrl: '/client/partials/home.html',
          controller: 'homeCtrl'
        }).
        when('/create', {
          templateUrl: '/client/partials/create.html',
          controller: 'createHuddleCtrl'
        });
}]);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);