app.controller('createHuddleCtrl', ['$scope', '$location', 'huddleService', function($scope, $location, huddleService){
    $scope.lifetimes = [
        {
            name: '1 minute',
            value : 1
        }, {
           name: '5 minutes',
           value: 5
        }, {
           name: '30 minutes',
            value: 30
        }];

    $scope.huddle = {};
	$scope.huddle.options = [];
    $scope.huddle.lifetime = $scope.lifetimes[1];

    $scope.addOption = function() {
        if($scope.huddle.options.length < 5) {
            $scope.huddle.options.push({
                title: ''
            });
        }
    }
    $scope.removeOption = function() {
        if($scope.huddle.options.length > 1) {
            $scope.huddle.options.pop();
        }
    }
    $scope.addOption();
    $scope.addOption();

    $scope.submit = function() {
        $scope.huddle.options = ($scope.huddle.options || []).filter(Boolean); // removes empty values

        if($scope.huddle.title && $scope.huddle.options.length > 0 && $scope.huddle.recipient && $scope.huddle.lifetime) {
            huddleService.createHuddle($scope.huddle).success(function(data) {
                $location.path('/');
            }).error(function(error) {
                console.log(error);
            });
        }
    }



}]);
