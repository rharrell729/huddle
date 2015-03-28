/* Controllers */

var voteControllers = angular.module('voteControllers', []);

voteControllers.controller('homeCtrl', ['$scope', '$http', '$timeout','Polls', function($scope, $http, $timeout, Polls){

//populate polls array with all polls in database
	$scope.polls = [];

	Polls.getPolls().success(function(data){
		data.forEach(function(item){
				var poll = {
					title : item.title,
					options : [],
					recipient : item.recipient,
					id : item.id,
					createdTime : null,
					visible : item.isVisible,
					hasEnded : item.hasEnded
				};

				if(item.option1 != ""){
					var option = {
						name : "",
						score : 0,
						color : null
					};
					option.name = item.option1;
					option.score = item.score1;
					poll.options[0] = option;
				};
				
				if(item.option2 != ""){
					var option = {
						name : "",
						score : 0,
						color : null
					};
					option.name = item.option2;
					option.score = item.score2;
					poll.options[1] = option;
				};

				if(item.option3 != ""){
					var option = {
						name : "",
						score : 0,
						color : null
					};
					option.name = item.option3;
					option.score = item.score3;
					poll.options[2] = option;
				};

				if(item.option4 != ""){
					var option = {
						name : "",
						score : 0,
						color : null
					};
					option.name = item.option4;
					option.score = item.score4;
					poll.options[3] = option;
				};
				
				if(item.option5 != ""){
					var option = {
						name : "",
						score : 0,
						color : null
					};
					option.name = item.option5;
					option.score = item.score5;
					poll.options[4] = option;
				};

				$scope.polls.push(poll);

				//Time related stuff
	    		poll.createdTime = new Date(item.timestamp.replace(/-/g, '/')).getTime();
	    		localTime = new Date();
	    		timeDiff = localTime.getTimezoneOffset();
	    		currentTime = localTime.getTime() + timeDiff * 60000;
	    		poll.timeleft = ((poll.createdTime + 60000*item.lifetime) - currentTime) / 60000;
	    		console.log(poll.timeleft);

	    		$timeout(pollEnded, Math.max(poll.timeleft, 0));

	    		//if(poll.timeleft <= 0){
	    		function pollEnded(){
	    			console.log(poll);
	    			console.log(poll.title);
	    			poll.hasEnded = "true";
	    			//set timeleft to 0
	    			poll.timeleft = 0;
	    			//disabled state
	    			poll.options[0].color = '#FFD1FF';
						for(i=0; i<poll.options.length-1; i++){
							if(poll.options[i].score == poll.options[i+1].score){
								poll.options[i].color = null;
							} else if(poll.options[i].score < poll.options[i+1].score) {
								poll.options[i+1].color= '#FFD1FF';
								poll.options[i].color = null;
	    					};
	    				};
	    		};
		});
	});

	$scope.hidePoll = function(poll){
		console.log("got here");
		poll.visible = false;

		var updateObject = {
				pollID : poll.id,
		};

		$http.post('http://127.0.0.1:3000/visibility/post/', updateObject).
	          success(function(data, status, headers, config) {
	    }).
	          error(function(data, status, headers, config) {
	    });
	};

	$scope.vote = function(option, poll){
			option.score++;

			var updateObject = {
				pollID : poll.id,
				option : option.name,
				score : option.score
			};

			//send poll id; option name; score to server
		    $http.post('http://127.0.0.1:3000/score/post/', updateObject).
	          success(function(data, status, headers, config) {
	        }).
	          error(function(data, status, headers, config) {
	        });
	};

}]);

voteControllers.controller('createCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
	$scope.poll = {};
	$scope.poll.options = [];
	$scope.poll.lifetimes = [1 + ' minute', 5 + ' minutes', 30 + 'minutes'];
	$scope.poll.lifetimeDisplayed = $scope.poll.lifetimes[0];
	$scope.poll.lifetimeParsed = 5;

	//start with two options
	for (i=1; i<3; i++){
		$scope.poll.options.push({
			text: "",
			num: i
		});
	};

	//add an option
	var options = 2;	
	$scope.poll.options.add = function(item, event){
		if(options < 5){
	    	options++;
	    	$scope.poll.options.push({
	    		text: "",
	    		num: options
	    	});
	    };
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
		$http.post('http://127.0.0.1:3000/polls/post/', pollObject).
	       success(function(data, status, headers, config) {
	          //console.log(data);
	       }).
	       error(function(data, status, headers, config) {
	          //alert("Submitting form failed!");
	       });
	};

}]);
