console.log("client.js");
var socket = io.connect('http://localhost:3000');
// var sidenav = null;

$(function () {
    M.AutoInit();
    $(".dropdown-trigger").dropdown();
    $('.sidenav').sidenav();
    M.Range.init($('input[type=range]'));
    $('select').formSelect();
    $('.tabs').tabs();
    console.log('init')
})

socket.on('timeframes', function (data) {
    console.log('timeframes: ', data);
    var select = $(".time_frame");
    console.log(select);
    data.forEach(value => {
        var option = new Option(value, value);
        $(option).html(value);
        $(".time_frame").append(option);
    });
});

socket.on('markets', function (data) {
    console.log('markets: ', data);
    var select = $(".markets");
    console.log(select);
    Object.keys(data).forEach(value => {
        var option = new Option(value, value);
        $(option).html(value);
        $(".markets").append(option);
    });
})


function saveData() {
    console.log('saveData');
    // var elems = document.querySelectorAll('.sidenav');
    // var instances = M.Sidenav.init(elems);
    // console.log(elems)
    // var instance = M.Sidenav.getInstance(elem);
    // instances.open();
}
socket.on('time', function (data) {
    // console.log(data);
    $('#time').html(data);
    // $('#value_rsi').html()
    // socket.emit('receivedFromClient', { my: 'data' });
});

socket.on('send_rsi', function (data) {
    // console.log(data);
    $('#value_rsi').html(data);
    // socket.emit('receivedFromClient', { my: 'data' });
});

socket.on('send_ema_1', function (data) {
    console.log('send_ema_1: ', data);
    $('#value_ema_1').html(data);
    // socket.emit('receivedFromClient', { my: 'data' });
});
socket.on('send_ema_2', function (data) {
    // console.log(data);
    $('#value_ema_2').html(data);
    // socket.emit('receivedFromClient', { my: 'data' });
});
socket.on('send_ema_3', function (data) {
    // console.log(data);
    $('#value_ema_3').html(data);
    // socket.emit('receivedFromClient', { my: 'data' });
});

socket.on('send_sar', function (data) {
    // console.log(data);
    $('#value_sar').html(data);
    // socket.emit('receivedFromClient', { my: 'data' });
});

// FUNCTIONS VALUE PERIOD
function rsi() {
    var period = $('#period_rsi').val();
    console.log('period_rsi: ', period);
    socket.emit('rsi_period', $('#period_rsi').val());
}
function ema1() {
    var period = $('#period_ema_1').val();
    console.log('period_ema_1: ', period);
    socket.emit('period_ema_1', $('#period_ema_1').val());
}
function ema2() {
    var period = $('#period_ema_2').val();
    console.log('period_ema_2: ', period);
    socket.emit('period_ema_2', $('#period_ema_2').val());
}
function ema3() {
    var period = $('#period_ema_3').val();
    console.log('period_ema_3: ', period);
    socket.emit('period_ema_3', $('#period_ema_3').val());
}
function sar() {
    var period1 = $('#period_sar_1').val();
    var period2 = $('#period_sar_2').val();
    console.log('period_sar_1: ', period1);
    console.log('period_sar_2: ', period2);
    var period = [];
    period.push(period1);
    period.push(period2);
    socket.emit('period_sar', period);
}

// FUNCTIONS RANGE
function rangeCustom(value) {
    $('#span_rsi').html(value);
}

// FUNCTIONS CUSTOM STRATEGY
function rsiCustom() {
    var rsi_range = $('#rsi_range').val();
    console.log(rsi_range);
    var condition = $('#more_rsi').val();
    console.log(condition);
}


//SAVE DATA NAVBAR (key, secret, timeframe, coin stake amount)
function saveDataUser() {
    console.log('saveDataUser');
    var data_user = [];
    var key = $('.key').val();
    console.log('key:', key)
    var secret = $('.secret').val();
    data_user.push(key);
    data_user.push(secret);
    console.log(data_user);
    socket.emit('data_user', data_user);
}