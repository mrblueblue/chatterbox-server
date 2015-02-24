var fs = require('fs');
var fake;
fs.readFile('./messages.txt', function(err, data){
  fake = JSON.parse(data.toString());
});


var express = require('express');
var port = 3000;
var ip = "127.0.0.1";

var app = express();

app.use(express.static('../client'));

app.get('/', function(req, res){
  res.status(200).sendfile('index.html', {root: 'client'});
});

app.get('/classes', function(req, res){
  res.status(200).json(fake);
});

app.post('/classes', function(req, res){
  req.on('data', function(data){
    var parsed = JSON.parse(data.toString());
    fake.results.unshift(parsed);
    fs.writeFile('./messages.txt', JSON.stringify(fake));
    res.status(201).send();
  });
});



var server = app.listen(port, function(){
  var host = server.address().address;
  var daport = server.address().port;

  console.log(host + ': ' + daport);
});


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};















