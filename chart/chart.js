const connect = require('../connect/connect.js');
// var ped = null;
connect.binance.websockets.chart("BNBUSDT", "1m", (symbol, interval, chart) => {
    let tick = connect.binance.last(chart);

    console.log(chart)
    const last = chart[tick].close;
    // console.info(chart);
    // Optionally convert 'chart' object to array:
    // let ohlc = binance.ohlc(chart);
    // console.info(symbol, ohlc);
    console.info(symbol + " last price: " + last)
});
