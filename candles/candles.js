const connect = require('../connect/connect.js');

// Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
connect.binance.websockets.chart("BNBUSDT", "1m", (symbol, interval, chart) => {
    let tick = connect.binance.last(chart);
    const last = chart[tick].close;
    // console.info(chart);
    // Optionally convert 'chart' object to array:
    // let ohlc = binance.ohlc(chart);
    // console.info(symbol, ohlc);
    console.info(symbol+" last price: "+last)
  });


  function period_candle(period) {
      
  }