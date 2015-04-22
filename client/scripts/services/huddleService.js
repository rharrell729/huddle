app.service('huddleService', ['$http', function($http) {
    this.getHuddles = function() {
        return $http({
            url: '/api/huddle/list/',
            method: 'GET'
        });
    }

    this.createHuddle = function(huddleObj) {
        return $http({
            method: 'POST',
            url: '/api/huddle/create/',
            data: huddleObj
        });
    }
}]);