
var fs = require('fs');
var express = require('express');
var cors = require('cors')
var app = express();
var port = 3000;
var database;

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

fs.readFile('./messages.txt', function(err, data){
  database = JSON.parse(data.toString());
});

app.use(express.static('../client'));
app.use(cors());

app.get('/', function(req, res){
  res.header(headers).status(200).sendfile('index.html', {root: 'client'});
});

app.get('/classes', function(req, res){
  res.header(headers).status(200).json(database);
});

app.post('/classes', function(req, res){
  req.on('data', function(data){
    var parsed = JSON.parse(data.toString());
    database.results.unshift(parsed);
    fs.writeFile('./messages.txt', JSON.stringify(database));
    res.header(headers).status(201).send();
  });
});

var server = app.listen(port, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening @ ' + host + ': ' + port);
});












