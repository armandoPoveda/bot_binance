const Binance = require('node-binance-api');
const binance = new Binance();

var conn = {
    binance: new Binance().options({
        APIKEY: 'zJ8M6us8qAI6jSb8Q7D9YkyRnxg5CuNddEBO0trs2kTaXfsYgfVdcLhwknGcVaEq',
        APISECRET: '7JYEUFzNv4w2JnfE691V7LUKnCdTrOqTawMfGPkmpQBv954Jf32581UqFWdpj5Nu',
        useServerTime: true,
        recvWindow: 60000, // Set a higher recvWindow to increase response timeout
        verbose: true, // Add extra output when subscribing to WebSockets, etc
        log: log => {
            console.log(log); // You can create your own logger here, or disable console output
        }
    }),
}

// console.log(binance.useServerTime());

module.exports = conn;