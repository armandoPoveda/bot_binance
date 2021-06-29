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
// const tulind = require('./indicators/tulind/tulind.js');
const tulind = require('tulind');

const dateformat = require('dateformat');
const conn = require('./connect/connect.js');

app.use(express.static('public'));

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

server.listen(3000, function () {
    console.log('HTTP server started on port 3000');
});

var period_rsi = 5;
var period_ema_1 = 5;
var period_ema_2 = 10;
var period_ema_3 = 20;
var period_sar_1 = 0.02;
var period_sar_2 = 0.2;
// var period_sar = [];
var input_markets = [];
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}


io.on('connection', function (socket) {
    console.log('Client connection received');
    // socket.emit('sendToClient', { hello: 'world' });
    socket.on('rsi_period', function (data) {
        period_rsi = data;
        console.log(data);
    });

    socket.emit('timeframes', Object.keys(connect.exchange.timeframes));

    connect.exchange.loadMarkets().then(function (resolve) {
        socket.emit('markets', Object.keys(resolve));
    })

    connect.exchange.fetchBalance().then(function (resolve) {
        console.log(resolve);
        socket.emit('balance', resolve.free);
    })

    socket.on('period_ema_1', function (data) {
        period_ema_1 = data;
        console.log(data);
    });
    socket.on('period_ema_2', function (data) {
        period_ema_2 = data;
        console.log(data);
    });
    socket.on('period_ema_3', function (data) {
        period_ema_3 = data;
        console.log(data);
    });
    socket.on('period_sar', function (data) {
        period_sar = data;
        period_sar_1 = data[0];
        period_sar_2 = data[1];
        console.log(data);
    });

    setInterval(() => {
        var now = new Date();
        var format_time = new Date(now + 1000);
        socket.emit('time', dateformat(format_time));
    }, 1000);

    socket.on('data_user', function (data) {
        console.log('user data: ', data);
        localStorage.setItem('key', data[0]);
        localStorage.setItem('secret', data[1]);
        console.log(localStorage.getItem('key'));
        console.log(localStorage.getItem('secret'));
    })
});

//WEBSOCKETS CHARTS (send data client indicators values)
connect.binance.websockets.chart("BNBUSDT", "1m", (symbol, interval, chart) => {
    // let tick = connect.binance.last(chart);
    // const last = chart[tick].close;
    let ohlc = connect.binance.ohlc(chart);

    // io.on('period_rsi', period);

    // close.push(ohlc.close);
    // console.log(input.close)
    // console.info(chart);
    // Optionally convert 'chart' object to array:
    // console.log(ohlc.high)

    tulind.indicators.rsi.indicator([ohlc.close], [period_rsi], function (err, results) {
        // console.log("Result of rsi is: ", results[0]);
        result_rsi = results[0];
        // console.log(result_rsi[result_rsi.length - 1]);
        io.emit('send_rsi', result_rsi[result_rsi.length - 1].toFixed(2));
    })

    tulind.indicators.ema.indicator([ohlc.close], [period_ema_1], function (err, results) {
        // console.log("Result of ema is: ", results[0]);
        result_ema_1 = results[0];
        // console.log(result_ema.slice(-1).pop());
        io.emit('send_ema_1', result_ema_1[result_ema_1.length - 1].toFixed(2));
    })

    tulind.indicators.ema.indicator([ohlc.close], [period_ema_2], function (err, results) {
        // console.log("Result of ema is: ", results[0]);
        result_ema_2 = results[0];
        // console.log(result_ema.slice(-1).pop());
        io.emit('send_ema_2', result_ema_2[result_ema_2.length - 1].toFixed(2));
    })

    tulind.indicators.ema.indicator([ohlc.close], [period_ema_3], function (err, results) {
        // console.log("Result of ema is: ", results[0]);
        result_ema_3 = results[0];
        // console.log(result_ema.slice(-1).pop());
        io.emit('send_ema_3', result_ema_3[result_ema_3.length - 1].toFixed(2));
    })
    // console.log('period 1 sar: ', period_sar_1)
    // console.log('period 2 sar: ', period_sar_2)
    tulind.indicators.psar.indicator([ohlc.high, ohlc.low], [period_sar_1, period_sar_2], function (err, results) {
        // console.log("Result of ema is: ", results[0]);
        result_sar = results[0];
        // console.log(result_sar.slice(-1).pop());
        io.emit('send_sar', result_sar[result_sar.length - 1].toFixed(2));
    })
    // console.log(ohlc.close)
    // var rsi = tulind.rsi(ohlc.close);
    // console.info(symbol, ohlc);
    // console.info(symbol + " last price: " + last)
});



