/* App module */

(function(){
var app = angular.module('vote', [
	'ngRoute',
	'voteControllers',
  'huddleServices'
]);

app.config((['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl'
      }).
      when('/create', {
        templateUrl: 'partials/create.html',
        controller: 'createCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]));

})();