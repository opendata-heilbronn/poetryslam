var express = require('express');
var opener = require('opener');
var ip = require('ip');

var app = express();
var http = require('http').Server(app);

app.use(express.static('web'));

http.listen(3000, function() {
    console.log('listening on ' + ip.address() + ':3000');
    opener("http://localhost:3000/index.html");
    opener("http://localhost:3000/admin.html");
});