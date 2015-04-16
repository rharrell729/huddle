var express = require('express');
var app = express();
var appRoot = '../app';

var bodyParser = require('body-parser');

//For sqlite
var http = require('http');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('polls.db');

//HTTP requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(appRoot + '/app'));
app.use('/scripts',  express.static(appRoot));
app.use('/partials', express.static(appRoot + '/partials'));

app.get('/', function (req, res) {
  	res.sendFile('views/index.html', {root: appRoot});
});
app.get('/create', function(req, res) {
	res.sendFile('views/index.html', { root: appRoot});
})

//add new poll to dB
app.post('/polls/post', function (req, res){
	var title = req.body.title;
		options = req.body.options;
		recipient = req.body.recipient;
		lifetime = req.body.lifetime;
		idNum = 0;

	db.serialize(function() {
		//create polls table
		db.run("CREATE TABLE if not exists polls (title TEXT, recipient TEXT, lifetime INT, isVisible INT, hasEnded INT, Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, huddleID INTEGER PRIMARY KEY AUTOINCREMENT)");
		
		//create options table
		db.run("CREATE TABLE if not exists options (optionName TEXT, optionScore INT, huddleID INTEGER, FOREIGN KEY (huddleID) REFERENCES polls(huddleID))");

		//add poll
		var stmt1 = db.prepare("INSERT INTO polls (title, recipient, lifetime, isVisible, hasEnded) VALUES (?, ?, ?, ?, ?)");
		db.run(title, recipient, lifetime, 1, 0);	
		stmt1.finalize();
		
		//get huddleID to use as foreign key
		db.get("SELECT huddleID FROM polls ORDER BY huddleID DESC LIMIT 1;", function(err, val) {
			idNum = val.huddleID;

			//add huddle options to options table
			var stmt2 = db.prepare("INSERT INTO options (optionName, optionSCore, huddleID) VALUES (?, ?, ?)");
			options.forEach(function(option){
				stmt2.run(option.text, 0, idNum);
			}); 
			stmt2.finalize();

		});
	});

	//db.close();
	res.send();
});

//update poll state to ended
app.post('/hasEnded/post', function (req, res){
	var pollID = req.body.pollID;

	db.each("SELECT * FROM polls WHERE huddleID==" + pollID, function(err, row){
		db.run("UPDATE polls SET hasEnded = 1");
	});

	res.send();
});

//remove dB from homepage
app.post('/visibility/post', function (req, res){
	var pollID = req.body.pollID;

	db.each("SELECT * FROM polls WHERE huddleID==" + pollID, function(err, row){
		db.run("UPDATE polls SET isVisible = 0 WHERE huddleID==" + pollID);
	});

	res.send();
});


//update dB with new score
app.post('/score/post', function (req, res){
	var pollID = req.body.pollID;
		option = req.body.option;
		score = req.body.score;
		column = "";

	db.each("SELECT * FROM polls WHERE huddleID==" + pollID, function(err, row){
		if(row.option1 == req.body.option){
			column = "score1";
		};
		if(row.option2 == req.body.option){
			column = "score2";
		};
		if(row.option3 == req.body.option){
			column = "score3";
		};
		if(row.option4 == req.body.option){
			column = "score4";
		};
		if(row.option5 == req.body.option){
			column = "score5";
		};
		db.run("UPDATE polls SET " + column + " = " + score + " WHERE huddleID==" + pollID);
	});

	res.send();
});

//Pull polls from DB
app.get('/polls/get/', function (req, res) {
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	var polls = [];
	db.each("SELECT * FROM polls", function(err, row) {
		polls.push({
			title: row.title,
			recipient: row.recipient,
			lifetime: row.lifetime,
			isVisible: row.isVisible,
			timestamp: row.Timestamp,
			id : row.huddleID,
			option : row.optionName,
			score : row.optionScore
		});
	}, 
	function(){
	res.send(JSON.stringify(polls));
	});
});

app.listen(3000);