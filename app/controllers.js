/* Controllers */
var voteControllers = angular.module('voteControllers', []);

voteControllers.controller('homeCtrl', ['$scope', '$http', function($scope, $http){
	$scope.polls = [];

	$http.get("http://127.0.0.1:3000/polls/get/").
		success(function(data){
			data.forEach(function(item){
				$scope.polls.push(item);
			})
		});
}]);

voteControllers.controller('createCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
	//Do something
	//data.name = scope.name, etc...
	//http.post(url, data);
}]);
