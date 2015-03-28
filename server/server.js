var express = require('express')
var app = express()
var appRoot = '/Users/Rob/Projects/vote/'

var bodyParser = require('body-parser')

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
app.use('/scripts',  express.static(appRoot + '/app'));

app.get('/', function (req, res) {
  res.sendFile('app/index.html', {root: appRoot});
});

app.get('/foo/', function (req, res) {
  res.send('Hello foo')
});

//add new poll to dB
app.post('/polls/post', function (req, res){
	var title = req.body.title;
		options = req.body.options;
		recipient = req.body.recipient;
		lifetime = req.body.lifetime;

	var optionsString = JSON.stringify(options);
	console.log(optionsString);

	//Fill the rest of the options with dummy data
	var optionNum = options.length;
	for (i=optionNum; i<6; i++){
		options.push({
			text : "",
			num : optionNum
		});
	};

	db.serialize(function() {
		db.run("CREATE TABLE if not exists polls (title TEXT, option1 TEXT, option2 TEXT, option3 TEXT, option4 TEXT, option5 TEXT, score1 INT, score2 INT, score3 INT, score4 INT, score5 INT, recipient TEXT, lifetime INT, isVisible INT, hasEnded INT, Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, id INTEGER PRIMARY KEY AUTOINCREMENT)");
		var stmt = db.prepare("INSERT INTO polls (title, option1, option2, option3, option4, option5, score1, score2, score3, score4, score5, recipient, lifetime, isVisible, hasEnded) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		stmt.run(title, options[0].text, options[1].text, options[2].text, options[3].text, options[4].text, 0, 0, 0, 0, 0, recipient, lifetime, 1, 0);	
		stmt.finalize();
	});

	//db.close();
	res.send();
});

//update poll state to ended
app.post('/hasEnded/post', function (req, res){
	var pollID = req.body.pollID;

	db.serialize(function(){
		db.each("SELECT * FROM polls WHERE id==" + pollID, function(err, row){
			db.run("UPDATE polls SET hasEnded = 1");
		});
	});

	res.send();
});

//remove dB from homepage
app.post('/visibility/post', function (req, res){
	var pollID = req.body.pollID;

	db.serialize(function(){
		db.each("SELECT * FROM polls WHERE id==" + pollID, function(err, row){
			db.run("UPDATE polls SET isVisible = 0 WHERE id==" + pollID);
		});
	});

	res.send();
});


//update dB with new score
app.post('/score/post', function (req, res){
	var pollID = req.body.pollID;
		option = req.body.option;
		score = req.body.score;
		column = "";

	db.serialize(function(){
		db.each("SELECT * FROM polls WHERE id==" + pollID, function(err, row){
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
			db.run("UPDATE polls SET " + column + " = " + score + " WHERE id==" + pollID);
		});
	});

	res.send();
});

//Pull polls from DB
app.get('/polls/get/', function (req, res) {
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	var polls = [];

	db.serialize(function(){
		db.each("SELECT * FROM polls", function(err, row){
			polls.push({
				title: row.title,
				option1: row.option1,
				option2: row.option2,
				option3: row.option3,
				option4: row.option4,
				option5: row.option5,
				score1: row.score1,
				score2: row.score2,
				score3: row.score3,
				score4: row.score4,
				score5: row.score5,
				recipient: row.recipient,
				lifetime: row.lifetime,
				isVisible: row.isVisible,
				timestamp: row.Timestamp,
				id : row.id
			});
		}, function(){
		res.send(JSON.stringify(polls));
		});
	});
});

app.listen(3000)