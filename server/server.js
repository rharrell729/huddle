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

app.post('/polls/post', function (req, res){
	console.info('request hit server');
	var title = req.body.title;
		option1 = req.body.option1,
		option2 = req.body.option2,
		option3 = req.body.option3,
		score1 = req.body.score1,
		score2 = req.body.score2,
		score3 = req.body.score3,
		recipient = req.body.recipient;
	res.send();

	//	Add poll to the DB
	db.serialize(function() {
		db.run("CREATE TABLE if not exists polls (title TEXT, option1 TEXT, option2 TEXT, option3 TEXT, score1 INT, score2 INT, score3 INT, recipient TEXT)");
		var stmt = db.prepare("INSERT INTO polls (title, option1, option2, option3, score1, score2, score3, recipient) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
		stmt.run(title, option1, option2, option3, 0, 0, 0, recipient);	
		stmt.finalize();
	});

	//db.close();

});

app.get('/polls/get/', function (req, res) {
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	var polls = [];

	//Pull polls from DB
	db.serialize(function(){
		db.each("SELECT * FROM polls", function(err, row){
			polls.push({
				title: row.title,
				option1: row.option1,
				option2: row.option2,
				option3: row.option3,
				score1: row.score1,
				score2: row.score2,
				score3: row.score3,
				recipient: row.recipient
			});
		}, function(){
		res.send(JSON.stringify(polls));
		});
	});
});

app.listen(3000)