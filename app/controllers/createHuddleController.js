app.controller('createHuddleCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
	$scope.poll = {};
	$scope.poll.options = [];
	$scope.poll.lifetimes = [1 + ' minute', 5 + ' minutes', 30 + 'minutes'];
	$scope.poll.lifetimeDisplayed = $scope.poll.lifetimes[0];
	$scope.poll.lifetimeParsed = 5;

	//start with two options
	for (var i=1; i<3; i++){
		$scope.poll.options.push({
			text: "",
			num: i
		});
	}

	//add an option
	var options = 2;	
	$scope.poll.options.add = function(item, event){
		if(options < 5) {
			options++;
			$scope.poll.options.push({
				text: "",
				num: options
			});
		}
    };

    $scope.poll.lifetime = function(item, event){
    	$scope.poll.lifetimeDisplayed = item;
    	var str = item.split(" ");
    	$scope.poll.lifetimeParsed = str[0];
    	console.log($scope.poll.lifetimeParsed);
    };

	$scope.poll.submit = function(item, event){
		var pollObject = {
	      title : $scope.poll.title,
	      options : $scope.poll.options,
	      recipient : $scope.poll.recipient,
	      lifetime : $scope.poll.lifetimeParsed
	    };

    	//send poll to server
		$http.post('/polls/post/', pollObject).
	       success(function(data, status, headers, config) {
	          //console.log(data);
	       }).
	       error(function(data, status, headers, config) {
	          //alert("Submitting form failed!");
	       });
	};

}]);
