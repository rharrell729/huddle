app.controller('registerCtrl', ['$scope', 'userService', function($scope, userService) {
	$scope.user = {};

    $scope.submit = function() {
	    if($scope.user.first_name && $scope.user.last_name && $scope.user.email && $scope.user.username && $scope.user.password) {
	        userService.registerUser($scope.user).success(function(data) {
	            $location.path('/');
	        }).error(function(error) {
	            console.log(error);
	        });
	    }
    }
}]);
