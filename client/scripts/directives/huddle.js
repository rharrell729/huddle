app.directive('huddle', ['huddleService', function(huddleService) {
    return {
        restrict: 'A',
        templateUrl: '/client/partials/huddle.html',
        link: function(scope, element, attrs) {
            scope.vote = function(huddleId, optionId, value) {
                huddleService.voteForHuddle(huddleId, optionId, value).success(function(data) {
                    scope.huddle = data;
                }).error(function(error) {
                    console.error(error);
                })
                console.log(huddleId, optionId, value);
            }
        }
    }
}]);