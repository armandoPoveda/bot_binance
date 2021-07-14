// INDICATORS
const require_tech = require('./require.js');

var indicators_list = {

    rsi: function(values) {
        result = require_tech.RSI.calculate(values);
        return result.pop();  
    },

    ema: function(values) {
        result = require_tech.EMA.calculate(values);
        return result[result.length - 1];  
    },

}

module.exports = indicators_list;