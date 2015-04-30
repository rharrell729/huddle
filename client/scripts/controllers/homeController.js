app.controller('homeCtrl', ['$scope', '$rootScope', '$timeout','huddleService', function($scope, $rootScope, $timeout, huddleService){

    // We load huddle data on page load
    huddleService.getHuddles().success(function(data) {
        $scope.huddles = data;
        console.log(data);
    }).error(function(error) {
        console.error(error);
    });

    // We need to reload huddle data on user updated
    $scope.$on('UserUpdated', function(event, user) {
        huddleService.getHuddles().success(function(data) {
            $scope.huddles = data;
            console.log(data);
        }).error(function(error) {
            console.error(error);
        });
    });

}]);