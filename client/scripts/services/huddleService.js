app.service('huddleService', ['$http', function($http) {
    this.getHuddles = function() {
        return $http({
            url: '/api/huddle/list/',
            method: 'GET',
            params: { 'cachebuster' : new Date().getTime() }
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