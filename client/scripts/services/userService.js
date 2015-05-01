app.service('userService', ['$http', function($http) {
    this.registerUser = function(userObj) {
        return $http({
            method: 'POST',
            url: 'api/user/register/',
            data: userObj
        });
    }
}]);