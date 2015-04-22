app.controller('createHuddleCtrl', ['$scope', 'huddleService', function($scope, huddleService){
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

	//$scope.poll.lifetimeDisplayed = $scope.poll.lifetimes[0];
	//$scope.poll.lifetimeParsed = 5;
    //
	////start with two options
	//for (var i=1; i<3; i++){
	//	$scope.poll.options.push({
	//		text: "",
	//		num: i
	//	});
	//}
    //
	////add an option
	//var options = 2;
	//$scope.poll.options.add = function(item, event){
	//	if(options < 5) {
	//		options++;
	//		$scope.poll.options.push({
	//			text: "",
	//			num: options
	//		});
	//	}
    //};
    //
    //$scope.poll.lifetime = function(item, event){
    	//$scope.poll.lifetimeDisplayed = item;
    	//var str = item.split(" ");
    	//$scope.poll.lifetimeParsed = str[0];
    	//console.log($scope.poll.lifetimeParsed);
    //};
    //
	//$scope.poll.submit = function(item, event){
	//	var pollObject = {
	//      title : $scope.poll.title,
	//      options : $scope.poll.options,
	//      recipient : $scope.poll.recipient,
	//      lifetime : $scope.poll.lifetimeParsed
	//    };

    $scope.submit = function() {
        $scope.huddle.options = ($scope.huddle.options || []).filter(Boolean); // removes empty values

        if($scope.huddle.title && $scope.huddle.options.length > 0 && $scope.huddle.recipient && $scope.huddle.lifetime) {
            huddleService.createHuddle($scope.huddle).success(function(data) {
                console.log(data);
            }).error(function(error) {
                console.log(error);
            });
        }
    }



}]);
