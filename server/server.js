var express = require('express')
var app = express()
var appRoot = '/Users/Rob/Projects/vote/'

app.use(express.static(appRoot + '/app'));
app.use('/scripts',  express.static(appRoot + '/app'));

app.get('/', function (req, res) {
  res.sendFile('app/index.html', {root: appRoot});
});

app.get('/foo/', function (req, res) {
  res.send('Hello foo')
});

app.post('/polls/post/', function (req, res){

	//data should be in req.data or something similar.
	// when you call this, attach your js object to the data field of the http request.


	//here you should use a node module for aws or sqlAzure to connect and send data to your db
	res.send();
});

app.get('/polls/get/', function (req, res) {
	//res.setHeader('Content-Type', 'application/json');
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	var polls = [];
	polls.push({
		title: "test poll",
		options: {
			foo: 1,
			bar: 0,
			buzz: 3,
		},
		author: "Rob",
	},
	{
		title: "test poll 2",
		options: {
			foo: 12,
			bar: 10,
			buzz: 3,
		},
		author: "Evan",
	}); 
  res.send(JSON.stringify(polls))
});

app.listen(3000)