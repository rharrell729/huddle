app.service('huddleService', ['$http', function($http) {
    this.getHuddles = function() {
        return $http({
            url: '/api/huddle/list/',
            method: 'GET',
            params: { 'cachebuster' : new Date().getTime() }
        });
    };

    this.createHuddle = function(huddleObj) {
        return $http({
            method: 'POST',
            url: '/api/huddle/create/',
            data: huddleObj
        });
    };

    this.voteForHuddle = function(huddleId, voteId, value) {
        return $http({
           method: 'POST',
            url: '/api/huddle/vote/',
            data: {
                huddleId : huddleId,
                optionId: voteId,
                value: value
            },
            params: { 'cachebuster': new Date().getTime()}
        });
    };
}]);