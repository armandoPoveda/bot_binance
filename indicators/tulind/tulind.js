const tulind = require('tulind');

var tulind_indi = {
    tulind_list : tulind.indicators,
    rsi: function (close) {
        tulind.indicators.rsi.indicator([close], [5], function (err, results) {
            // console.log("Result of rsi is: ", results[0]);
            result_rsi = results[0];
        })
        return result_rsi[result_rsi.lenght - 1];
    },

    ema: function(close) {
        tulind.indicators.ema.indicator([close], [5], function (err, results) {
            // console.log("Result of rsi is: ", results[0]);
            result_ema = results[0];
        })
        return result_ema[result_ema.lenght - 1];
    }
}
module.exports = tulind_indi;