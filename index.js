console.log('index.js');

// exprress, io, http
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

//connect
const connect = require('./connect/connect.js');

//tulind
const tulind = require('./indicators/tulind/tulind.js');
const dateformat = require('dateformat');



app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, function () {
    console.log('HTTP server started on port 3000');
});

io.on('connection', function (socket) {
    console.log('Client connection received');
    // socket.emit('sendToClient', { hello: 'world' });
    socket = socket;
    // socket.on('receivedFromClient', function (data) {
    //     console.log(data);
    // });
    setInterval(() => {
        serverTime();
        tulind_indi()
    }, 500);
});

function serverTime() {
    connect.binance.useServerTime().then(function (time) {
        var format_time = new Date(time.serverTime + 1000);
        io.emit('serverTime', dateformat(format_time));
    }).catch(function(e) {
        console.log('ERROR: ', e);
    });
}

function tulind_indi() {
   var rsi = tulind.rsi();
//    console.log(rsi);
   io.emit('send_rsi', rsi);
}
