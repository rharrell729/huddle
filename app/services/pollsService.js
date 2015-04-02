app.service('pollsService', ['$http', function($http) {
	this.getPolls = function() {
		return $http({
			url : '/polls/get',
			method: 'GET'
		});
	}
}]);