app.controller('homeCtrl', ['$scope', '$http', '$timeout','pollsService', function($scope, $http, $timeout, pollsService){

	// populate polls array with all polls in database
	$scope.polls = [];

	pollsService.getPolls().success(function(data){
		data.forEach(function(item){
			console.log(item);
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

	    		$timeout(pollEnded, Math.max(poll.timeleft, 0));

	    		//if(poll.timeleft <= 0){
	    		function pollEnded(){
	    			//console.log(poll);
	    			//console.log(poll.title);
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
		poll.visible = false;

		var updateObject = {
				pollID : poll.id
		};

		$http.post('/visibility/post/', updateObject).
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
		    $http.post('/score/post/', updateObject).
	          success(function(data, status, headers, config) {
	        }).
	          error(function(data, status, headers, config) {
	        });
	};

}]);