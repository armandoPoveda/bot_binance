const tulind = require('tulind');
// const charts = require('../../chart/chart.js');
// const candles = require('../../candles/candles.js');
// console.log(tulind);
var tulind_indi = {

    rsi: function (close) {
       console.log(close);
        var close = [4,5,6,6,6,5,5,5,6,4];
        tulind.indicators.rsi.indicator([close], [5], function (err, results) {
            // console.log("Result of rsi is: ", results[0]);
            result_rsi = results[0];
        })
        // console.log(result_rsi.slice(-1).pop());
        return result_rsi.slice(-1).pop();
    }
}
// console.log(tulind_indi.rsi());
module.exports = tulind_indi;