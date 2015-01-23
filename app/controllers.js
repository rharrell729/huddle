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

voteControllers.controller('createCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
	$scope.poll = {};

	$scope.poll.submit = function(item, event){
		console.log("--> creating Poll");
		var pollObject = {
          title : $scope.poll.title,
          option1 : $scope.poll.option1,
          option2 : $scope.poll.option2,
          option3 : $scope.poll.option3,
          recipient : $scope.poll.recipient
        };

		$http.post('http://127.0.0.1:3000/polls/post/', pollObject).
	       success(function(data, status, headers, config) {
	          //console.log(data);
	       }).
	       error(function(data, status, headers, config) {
	          //alert("Submitting form failed!");
	       });
	    };
}]);
