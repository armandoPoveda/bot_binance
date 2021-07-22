console.log('index.js');

// exprress, io, http
var express = require('express');
// var cors = require('cors')

var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

//connect
const connect = require('./connect/connect.js');

// indicators
var indicators = require('./indicators/technical/technical.js');
var tulind = require('./indicators/tulind/tulind.js');

const dateformat = require('dateformat');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

// app.use(cors());

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


io.on('connection', function (socket) {
    console.log('Client connection received');

    // socket.emit('sendToClient', { hello: 'world' });
    socket.on('rsi_period', function (data) {
        period_rsi = data;
        // console.log(data);
    });
    socket.emit('list_indicators', Object.keys(indicators));

    socket.emit('timeframes', Object.keys(connect.cctx_exchange.timeframes));

    connect.cctx_exchange.loadMarkets().then(function (resolve) {
        socket.emit('markets', Object.keys(resolve));
    })

    connect.cctx_exchange.fetchBalance().then(function (resolve) {
        // console.log(resolve);
        socket.emit('balance', resolve.free);
    })

    socket.on('period_ema', function (data) {
        if (data[0] !== '') {
            period_ema_1 = data[0];
        }
        if (data[1] !== '') {
            period_ema_2 = data[1];
        }
        if (data[2] !== '') {
            period_ema_3 = data[2];

        }
        // console.log(data);
    });
    // socket.on('period_ema_2', function (data) {
    //     period_ema_2 = data;
    //     console.log(data);
    // });
    // socket.on('period_ema_3', function (data) {
    //     period_ema_3 = data;
    //     console.log(data);
    // });
    socket.on('period_sar', function (data) {
        period_sar = data;
        period_sar_1 = data[0];
        period_sar_2 = data[1];
        // console.log(data);
    });

    setInterval(() => {
        var now = new Date();
        var format_time = new Date(now + 1000);
        socket.emit('time', dateformat(format_time));
    }, 500);

    socket.on('data_user', function (data) {
        console.log('user data: ', data);
        localStorage.setItem('key', data[0]);
        localStorage.setItem('secret', data[1]);
        console.log(localStorage.getItem('key'));
        console.log(localStorage.getItem('secret'));
    })


    let input = {
        values: [],
        period: 14
    }

    // //WEBSOCKETS CHARTS (send data client indicators values)
    connect.binance.websockets.chart("BNBUSDT", "1m", (symbol, interval, chart) => {
        console.log('web web web')
        input.values = []
        let ohlc = connect.binance.ohlc(chart);
        input.values = ohlc.close;
        var rsi = indicators.rsi(input);
        console.log('rsi: ', rsi);
        socket.emit('send_rsi', rsi);
    });

    // let serverTime = []
    // let open = []
    // let high = []
    // let low = []
    // let close = [];
    // let volume = [];
    // let obj_candles = { serverTime: serverTime, open: open, high: high, low: low, close: close, volume: volume };

    // setInterval(() => {
    //     connect.exchange.fetch_ohlcv('BNB/USDT', '1m').then(function (resolve) {
    //         //         // console.log(resolve)
    //         serverTime = []
    //         open = []
    //         high = []
    //         low = []
    //         close = [];
    //         volume = [];

    //         resolve.forEach(element => {

    //             serverTime.push(element[0]);
    //             open.push(element[1]);
    //             high.push(element[2]);
    //             low.push(element[3]);
    //             close.push(element[4]);
    //             volume.push(element[5]);

    //         });

    //         // tulind.indicators.rsi.indicator([obj_candles.close], [Number(period_rsi)], function (err, results) {
    //         //     // console.log("Result of rsi is: ", results);
    //         //     result_rsi = results[0];
    //         //     console.log('rsi: ', result_rsi[result_rsi.length - 1]);
    //         //     // io.emit('send_rsi', result_rsi[result_rsi.length - 1].toFixed(2));
    //         // })
    //         // var input = [];
    //         // var algo = obj_candles.close.slice(obj_candles.close.length - 11);
    //         // console.log(algo);
    //         // tulind.indicators.rsi.indicator([close], [10], function (err, results) {
    //         //     // console.log("Result of rsi is: ", results);
    //         //     result_rsi_2 = results[0];
    //         //     console.log('RSI: ', result_rsi_2[result_rsi_2.length - 1]);
    //         //     io.emit('send_rsi', result_rsi_2[result_rsi_2.length - 1].toFixed(2));
    //         // })

    //         // tulind.indicators.stochrsi.indicator([close], [5], function (err, results) {
    //         //     // console.log("Result of rsi is: ", results);
    //         //     result_stochrsi = results[0];
    //         //     console.log('StochRsi: ', result_stochrsi[result_stochrsi.length - 1]);
    //         //     // io.emit('send_rsi', result_rsi[result_rsi.length - 1].toFixed(2));
    //         // })

    //         // tulind.indicators.stoch.indicator([high, low, close], [14, 3, 3], function (err, results) {
    //         //     // console.log("Result of ema is: ", results[0]);
    //         //     result_stoch_1 = results[0];
    //         //     result_stoch_2 = results[1];
    //         //     console.log('Stoch_1: ', result_stoch_1[result_stoch_1.length - 1]);
    //         //     console.log('Stoch_2: ', result_stoch_2[result_stoch_2.length - 1]);
    //         //     // io.emit('send_sar', result_sar[result_sar.length - 1].toFixed(2));
    //         // })

    //         // tulind.indicators.macd.indicator([close], [12, 26, 9], function (err, results) {
    //         //     // console.log("Result of macd is: ", results);
    //         //     macd = results[0];
    //         //     signal = results[1];
    //         //     histogram = results[2];

    //         //     console.log('Macd: ', macd[macd.length - 1]);
    //         //     console.log('Signal: ', Signal[Signal.length - 1]);
    //         //     console.log('Histogram: ', Histogram[histogram.length - 1]);
    //         //     // io.emit('send_sar', result_sar[result_sar.length - 1].toFixed(2));
    //         // })


    //         // tulind.indicators.rsi.indicator([obj_candles.close], [20], function (err, results) {
    //         //     // console.log("Result of rsi is: ", results);
    //         //     result_rsi_3 = results[0];
    //         //     console.log('rsi_3: ', result_rsi_3[result_rsi_3.length - 1]);
    //         //     // io.emit('send_rsi', result_rsi[result_rsi.length - 1].toFixed(2));
    //         // })



    //         // tulind.indicators.ema.indicator([obj_candles.close], [period_ema_1], function (err, results) {
    //         //     // console.log("Result of ema is: ", results[0]);
    //         //     result_ema_1 = results[0];
    //         //     // console.log(result_ema.slice(-1).pop());
    //         //     io.emit('send_ema_1', obj_candles.close);
    //         //     // io.emit('send_ema_1', result_ema_1[result_ema_1.length - 1].toFixed(2));
    //         // })

    //         // tulind.indicators.ema.indicator([obj_candles.close], [period_ema_2], function (err, results) {
    //         //     // console.log("Result of ema is: ", results[0]);
    //         //     result_ema_2 = results[0];
    //         //     // console.log(result_ema.slice(-1).pop());
    //         //     io.emit('send_ema_2', result_ema_2[result_ema_2.length - 1].toFixed(2));
    //         // })

    //         // tulind.indicators.ema.indicator([obj_candles.close], [period_ema_3], function (err, results) {
    //         //     // console.log("Result of ema is: ", results[0]);
    //         //     result_ema_3 = results[0];
    //         //     // console.log(result_ema.slice(-1).pop());
    //         //     io.emit('send_ema_3', result_ema_3[result_ema_3.length - 1].toFixed(2));
    //         // })
    //         // console.log('period 1 sar: ', period_sar_1)
    //         // console.log('period 2 sar: ', period_sar_2)
    //         // tulind.indicators.psar.indicator([high, low], [period_sar_1, period_sar_2], function (err, results) {
    //         //     // console.log("Result of ema is: ", results[0]);
    //         //     result_sar = results[0];
    //         //     console.log('result_sar: ', result_sar[result_sar.length - 1]);
    //         //     io.emit('send_sar', result_sar[result_sar.length - 1].toFixed(2));
    //         // })



    //     })
    // }, 1500);



    // setInterval(() => {
    // connect.binance2.candles({ symbol: 'BNBUSDT', interval: '1m' }).then(function (resolve) {
    //     input.values = []
    //     for (let i = 0; i < resolve.length; i++) {
    //         close.push(Number(resolve[i].close));
    //         input.values.push(Number(resolve[i].close));
    //     }
    // })

    // console.log(element);
    // var algo = true;
    var time = [];
    var value = [];
    var algo = { time: time, value: value };
    var input_charts = []
    connect.binance.websockets.candlesticks(['BNBUSDT'], "1m", (candlesticks) => {
        console.log('websocket');
        // console.log('websocket', candlesticks);
        let { e: eventType, E: eventTime, s: symbol, k: ticks } = candlesticks;
        console.log(eventTime)
        let { o: open, h: high, l: low, c: close, v: volume, n: trades, i: interval, f: time, x: isFinal, q: quoteVolume, V: buyVolume, Q: quoteBuyVolume } = ticks;
        // console.info(symbol+" "+interval+" candlestick update");
        // console.info("open: "+open);
        // console.info("high: "+high);
        // console.info("low: "+low);
        // console.info("close: "+close);
        // console.info("volume: "+volume);
        // console.info("isFinal: "+isFinal);
        // console.log(obj_candles.close)
        // if(algo === true){

        // if (isFinal === true) {
        //     // console.log('isFinal: ', isFinal)
        //     obj_candles.close.shift();
        //     input.values.shift();
        //     obj_candles.close.push(close);
        //     input.values.push(close);
        // } else {
        //     // console.log('isFinal: ', isFinal)
        //     obj_candles.close.pop();
        //     input.values.pop();
        //     obj_candles.close.push(close);
        //     input.values.push(close);
        // }

        // input.values = obj_candles.close;
        // var rsi = indicators.rsi(input);
        // console.log(rsi);
        // eventTime = eventTime + 1000;
        // console.log(dateformat(eventTime));
        // var d = new Date(eventTime),
        //     month = '' + (d.getMonth() + 1),
        //     day = '' + d.getDate(),
        //     year = d.getFullYear();

        // if (month.length < 2)
        //     month = '0' + month;
        // if (day.length < 2)
        //     day = '0' + day;

        // var new_date = [year, month, day].join('-');
        // console.log(dateformat(new_date));
        // var date = dateformat(eventTime).substr(dateformat(eventTime).length - 8); // => "Tabs1"
        // date.replace(':', '-');
        // console.log(date.replace(/:/g, '-'));
        // connect.binance.useServerTime().then(function(resolve) {
        // console.log(resolve.serverTime);
        algo.time = Math.floor(Date.now() / 1000);
        algo.value = close;
        // console.log(dateformat(algo.time));
        // input_charts.push(algo);
        // console.log(dateformat( resolve.serverTime));
        console.log('algo: ', algo)
        socket.emit('chart', algo);
        // });


    });

});



