/* Services */

var huddleServices = angular.module('huddleServices', ['ngResource']);

/*
huddleServices.factory('getPolls', ['$http', function($http){
		return{
			get: function(callback){
				$http.get("http://127.0.0.1:3000/polls/get/").
					then(function(data){
						return data.result;
					}

					)
					success(function(data){
						data.forEach(function(item){
							$scope.polls.push(item);
							console.log($scope.polls[0]);
						});
					})
		}
		};
}]);
*/
huddleServices.factory('Polls', function($http){
	return{
		getPolls : function() {
			return $http({
				url: 'http://127.0.0.1:3000/polls/get/',
				method: 'GET'
			})
		}
	}
});
/*

huddleServices.factory('Polls', ['$resource',
	function($resource){
		return $resource('http://127.0.0.1:3000/polls/get/', {
			query: {method:'GET', isArrary:true}
		});
	}]);
*/

