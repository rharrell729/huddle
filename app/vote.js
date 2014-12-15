(function(){
	var app = angular.module('vote', []);
	app.controller('VoteController', function($http){
		this.polls = [{
		title: "test poll",
		options: {
			foo: 1,
			bar: 0,
			buzz: 3,
		},
		author: "Evan",
	}];
		// $http.get("http://127.0.0.1:3000/polls/get/").
		// 	success(function(data){
		// 		this.polls = data;
		// 	});

	});
})();