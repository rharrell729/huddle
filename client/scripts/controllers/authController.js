app.controller('authCtrl', ['$scope', '$rootScope', 'authService', function($scope, $rootScope, authService) {
    $scope.loaded = false;
    $scope.auth = {};

    $scope.signout = function() {
        $scope.loaded = false;
        authService.signout().success(function() {
            $scope.user = null;
            $scope.loaded = true;
            $rootScope.$broadcast("UserUpdated", $scope.user);
        }).error(function(error) {
            $scope.loaded = true;
            console.log(error);
            $rootScope.$broadcast("UserUpdated", $scope.user);
        });
    }

    $scope.signin = function() {
        $scope.loaded = false;
        authService.signin($scope.auth).success(function(user) {
            $scope.user = user;
            $scope.loaded = true;
            $rootScope.$broadcast("UserUpdated", $scope.user);
        }).error(function(error) {
            $scope.loaded = true;
            console.log(error);
            $rootScope.$broadcast("UserUpdated", $scope.user);
        });
    }

    authService.getUserData().success(function(user) {
        console.log(user);
        $scope.user = user;
        $scope.loaded = true;

    }).error(function(error) {
        $scope.loaded = true;
       console.log(error);
    });


}]);
