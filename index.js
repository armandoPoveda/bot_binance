console.log('index.js');

// var app = require('express')();
// var http = require('http').Server(app);
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, function(){
  console.log('HTTP server started on port 3000');
});

io.on('connection', function(socket){
    console.log('Client connection received');
    socket.emit('sendToClient', { hello: 'world' });
     
    socket.on('receivedFromClient', function (data) {
        console.log(data);
    });
});


