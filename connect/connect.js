const Binance = require('node-binance-api');
const binance = new Binance();
const Binance2 = require('binance-api-node').default;
var ccxt = require('ccxt')



if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const exchangeId = 'binance'
, exchangeClass = ccxt[exchangeId]
, exchange = new exchangeClass ({
    'apiKey':  localStorage.getItem('key'),
    'secret': localStorage.getItem('secret'),
})

var conn = {
    binance: new Binance().options({
        APIKEY: localStorage.getItem('key'),
        APISECRET: localStorage.getItem('secret'),
        useServerTime: true,
        recvWindow: 60000, // Set a higher recvWindow to increase response timeout
        verbose: true, // Add extra output when subscribing to WebSockets, etc
        log: log => {
            console.log(log); // You can create your own logger here, or disable console output
        }
    }),
    binance2: Binance2({
        apiKey: localStorage.getItem('key'),
        apiSecret: localStorage.getItem('secret'),
    }),

    exchange
}

// console.log(binance.useServerTime());

module.exports = conn;