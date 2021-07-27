const tulind = require('tulind');

var tulind_indi = {

    tulind_list : tulind.indicators,

    rsi: function (close) {
        // console.log('.................', close)
        tulind.indicators.rsi.indicator([close], [14], function (err, results) {
            // console.log("Result of rsi is: ", results[0].pop());
            // console.log('err: ', err)
            result_rsi = results[0];
        })
        // console.log(result_rsi[result_rsi.lenght - 1])
        return result_rsi.pop().toFixed(2);
    },

    ema: function(close) {
        tulind.indicators.ema.indicator([close], [5], function (err, results) {
            // console.log("Result of rsi is: ", results[0]);
            result_ema = results[0];
        })
        return result_ema[result_ema.lenght - 1];
    },

    ema2: function(close) {
        tulind.indicators.ema.indicator([close], [10], function (err, results) {
            // console.log("Result of rsi is: ", results[0]);
            result_ema1 = results[0];
        })
        return result_ema1[result_ema1.lenght - 1];
    },

    ema3: function(close) {
        tulind.indicators.ema.indicator([close], [20], function (err, results) {
            // console.log("Result of rsi is: ", results[0]);
            result_ema2 = results[0];
        })
        return result_ema2[result_ema2.lenght - 1];
    }
}

module.exports = tulind_indi;