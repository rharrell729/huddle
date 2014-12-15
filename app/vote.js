(function(){
	var app = angular.module('vote', []);
	app.controller('VoteController', function($scope, $http){
		$scope.polls = [];
		$http.get("http://127.0.0.1:3000/polls/get/").
			success(function(data){
				data.forEach(function(item){
					$scope.polls.push(item);
				})
			});

	});
})();