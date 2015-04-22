app.controller('homeCtrl', ['$scope', '$timeout','huddleService', function($scope, $timeout, huddleService){
    huddleService.getHuddles().success(function(data) {
        $scope.huddles = data;
        console.log(data);
    }).error(function(error) {
        console.error(error);
    });


}]);