const tulind = require('tulind');
const candles = require('../../candles/candles.js');
// console.log(tulind);

var tulind_indi = {

    rsi: function () {
        console.log(candles);
        var close = [4,5,6,6,6,5,5,5,6,4];
        tulind.indicators.rsi.indicator([close], [5], function (err, results) {
            // console.log("Result of rsi is: ", results[0]);
            result_rsi = results[0];
        })
        // console.log(result_rsi.slice(-1).pop());
        return result_rsi.slice(-1).pop();
    }
}

module.exports = tulind_indi;