var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.get('/foo/', function (req, res) {
  res.send('Hello foo')
})

app.listen(3000)