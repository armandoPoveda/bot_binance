console.log("client.js");
// var express = require('express');

var socket = io();
var chart = null;
var lineSeries = null;
var input_charts = [];
var stepper1 = null;

$(function () {
    // stepper1 = new Stepper(document.querySelector('#stepper1'));


    // $('#myModal').css("display", "none");
    //    console.log('stepper:', stepper1)
    // $('#exampleModal').modal("show");
    // var stepper = new Stepper(document.querySelector('.bs-stepper'))
    // console.log(stepper);
    // var stepper1Node = document.querySelector('.bs-stepper')
    // var stepper1 = new Stepper(document.querySelector('#stepper1'))

    // stepper1Node.addEventListener('show.bs-stepper', function (event) {
    //     console.warn('show.bs-stepper', event)
    // })
    // stepper1Node.addEventListener('shown.bs-stepper', function (event) {
    //     console.warn('shown.bs-stepper', event)
    // })

    // var stepper2 = new Stepper(document.querySelector('#stepper2'), {
    //     linear: false,
    //     animation: true
    // })
    // var stepper3 = new Stepper(document.querySelector('#stepper3'), {
    //     animation: true
    // })
    // var stepper4 = new Stepper(document.querySelector('#stepper4'))
    // import Stepper from 'bs-stepper'

    // var stepper = new Stepper(document.querySelector('.bs-stepper'))

    //     chart = LightweightCharts.createChart(document.body, { width: 900, height: 600, localization: {
    //         locale: 'eu-EU',
    //     }, });


    //     lineSeries = chart.addLineSeries();
    //     chart.applyOptions({
    //         timeScale: {
    //             // rightOffset: 12,
    //             // barSpacing: 3,
    //             // fixLeftEdge: true,
    //             // lockVisibleTimeRangeOnResize: true,
    //             // rightBarStaysOnScroll: true,
    //             // borderVisible: false,
    //             // borderColor: '#fff000',
    //             visible: true,
    //             timeVisible: true,
    //             secondsVisible: true,
    //             tickMarkType: true,
    //             // tickMarkFormatter: (time, tickMarkType, locale) => {
    //             //     console.log('...............', time, tickMarkType, locale);
    //             //     const year = LightweightCharts.isBusinessDay(time) ? time.year : new Date(time * 1000).getUTCFullYear();
    //             //     return String(year);
    //             // },
    //         }
    //     });
    //     socket.on('chart', function (data) {
    //         console.log('chart: ', data);
    //         // data.time = Math.floor(Date.now() / 1000 | 0);
    //         lineSeries.update(data);
    //     })
})

// function stepperNext() {
//     stepper1.next();
//     // console.log($('.side').val());
//     if ($('.side').val() != null) {
//         $('#span_value_side').html($('.side').val());
//         // $('#textareabuy').html($('.side').val());
//     }
//     if ($('#indicator_stepper').val() != null) {
//         console.log($('#indicator_stepper').val())
//         // $('#textareabuy').html($('#indicator_stepper').val());
//         $('#span_value_indicator').html($('#indicator_stepper').val());
//     }
//     if ($('.input_period').val() != null) {
//         console.log($('.input_period').val())
//         // $('#textareabuy').html($('#indicator_stepper').val() + $('.input_period').val());
//         $('#span_value_period').html($('.input_period').val());
//     }
//     if ($('.condition').val() != null) {
//         console.log($('.condition').val())
//         // $('#textareabuy').html($('#indicator_stepper').val() + $('.input_period').val() + $('.condition').val());
//         $('#span_value_condition').html($('.condition').val());
//     }

//     if ($('.value').val() !== '') {
//         console.log($('.value').val())
//         $('#span_value').html($('.value').val());
//         $('.finished').html('Finished!!!');
//     }

   
//     if($('.side').val() === 'BUY' && $('.finished').html() === 'Finished!!!'){
//         $('#textareabuy').html($('#indicator_stepper').val() + $('.input_period').val() + $('.condition').val() + $('.value').val());
//     } 
//     if ($('.side').val() === 'SELL' && $('.finished').html() === 'Finished!!!') {
//         $('#textareasell').html($('#indicator_stepper').val() + $('.input_period').val() + $('.condition').val() + $('.value').val());
//     }

//      console.log('finish: ',  $('.finished').html())
//     if($('.finished').html() === 'Finished!!!'){
//         console.log('show modal other indicator');
//         $('#exampleModal').modal('show');
//     }
// }

function modalHide() {
    $('#exampleModal').modal('hide');
}
// function stepperPrevious() {
//     $('.finished').empty();
//     $('#span_value').empty();
//     stepper1.previous();
//     // $('#span_value_indicator').html('');
//     // $('#span_value_period').html('');
//     // $('#span_value_condition').html('');
// }

// function showModal() {
//     console.log('show Modal')
//     $('#modal').modal("show");
// }
// // function nextStep() {

// }
// stepper1.next();
// var sidenav = null;

// $(function () {
// M.AutoInit();
// $(".dropdown-trigger").dropdown();
// $('.sidenav').sidenav();
// M.Range.init($('input[type=range]'));
// $('select').formSelect();
// $('.tabs').tabs();
// console.log('init')
// $(".my_tabs").hide();  /*Instead of hiding .panel here you can hide it by using css for first time */

// $('.move').on('click', function (e) {
//     console.log('move event', e)
//     // d.style.position = "absolute";
//     var x = e.pageX;
//     var y = e.pageY;
//     var el = $(".prueba");
//     el.css('position', 'absolute');
//     el.css("left", x + 'px');
//     el.css("top", y + 'px');
// })
// var count = 0;
// $('.nav-btn').on('click', function (e) {
//     console.log('nav-btn: ', e);
//     $('.header').css('opacity', '0.9');
//     if (count === 0) {
//         $('.header-nav').addClass('active', 'active');
//         $('body').css('overflow', 'hidden');
//         count = 1;
//     } else {
//         $('.header-nav').removeClass('active', 'active');
//         $('body').css('overflow', '');
//         count = 0;
//     }
// })

// })

socket.on('list_indicators', function (data) {
    console.log('list_indicators: ', data);
    var select = $(".indicators");
    console.log(select);
    data.forEach(value => {
        var option = new Option(value, value);
        $(option).html(value);
        $(".indicators").append(option);
    });
});

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


socket.on('balance', function (data) {
    console.log('balance....: ', data);
    console.log($(".tbody_balance"))
    $(".tbody_balance").empty();
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            // var option = new Option(key, data[key]);
            // if (key === 'USDT' || key === 'BNB' || key === 'BTC' || key === 'ETH') {
            if (key === 'USDT') {
                var tr = $('<tr />');
                var th = $("<th />");
                var td = $("<td />");
                var td_input_amount = $('<td><input id="input_amount" class=" placeholder="' + key + '" type="number"></input></td>');
                // var td_input = $('<td scope="col">' + '<input value="' + key + '" oninput="checkBoxConfiguration(this.value)" id="check_' + key + '" type="radio" name="house"/></td>');
                th.html(key);
                td.html(data[key]);
                tr.append(th);
                tr.append(td);
                tr.append(td_input_amount);
                // tr.append(td_input);
                // console.log(tr)
                $(".tbody_balance").append(tr);
            }
        }
        $('#USDT').val(data[key]);
        $('.test_connection').css('pointer-events', 'none');
        $('.test_connection').css('cursor', 'default');
        // alert('CONGRATULATIONS!!!');
    }
    // socket.close();
    // $('#USDT').removeAttr("disabled");
    // $('#check_USDT').attr('checked', 'checked');
});



var usdt = [];
var btc = [];
var bnb = [];
var eth = [];

socket.on('markets', function (data) {
    console.log('markets: ', data);
    // var select = $(".markets");
    // console.log(select);
    data.sort();
    data.forEach(value => {
        if (value.includes('/USDT')) {
            usdt.push(value);
            var option = new Option(value, value);
            $(option).html(value);
            $(".markets").append(option);
        }
        if (value.includes('/BNB')) {
            bnb.push(value);
        }
        if (value.includes('/BTC')) {
            btc.push(value);
        }
        if (value.includes('/ETH')) {
            eth.push(value);
        }
    });
})

function checkBoxConfiguration(value) {
    // console.log('usdt: ', usdt);
    // console.log('bnb: ', bnb);
    // console.log('btc: ', btc);
    // console.log('eth: ', eth);
    // console.log(value);
    $('.markets').empty();
    if (value === 'BTC') {
        $('#BTC').removeAttr("disabled");
        $('#check_BTC').attr('checked', 'checked');
        btc.forEach(function (value) {
            var option = new Option(value, value);
            $(option).html(value);
            $(".markets").append(option);
        })
    } else {
        // btc = [];
        // $('.markets').empty();
        $('#BTC').val('BTC');
        $('#BTC').attr("disabled", 'disabled');
    }

    if (value === 'USDT') {
        $('#USDT').removeAttr("disabled");
        $('#check_USDT').attr('checked', 'checked');
        usdt.forEach(function (value) {
            var option = new Option(value, value);
            $(option).html(value);
            $(".markets").append(option);
        })
    } else {
        $('#USDT').val('USDT');
        $('#USDT').attr("disabled", 'disabled');
        // usdt = [];
        // $('.markets').empty();
    }

    if (value === 'ETH') {
        $('#ETH').removeAttr("disabled");
        $('#check_ETH').attr('checked', 'checked');
        eth.forEach(function (value) {
            var option = new Option(value, value);
            $(option).html(value);
            $(".markets").append(option);
        })
    } else {
        $('#ETH').val('ETH');
        $('#ETH').attr("disabled", 'disabled');
        // eth = [];
        // $('.markets').empty();
    }

    if (value === 'BNB') {
        $('#BNB').removeAttr("disabled");
        $('#check_BNB').attr('checked', 'checked');
        bnb.forEach(function (value) {
            var option = new Option(value, value);
            $(option).html(value);
            $(".markets").append(option);
        })
    } else {
        $('#BNB').val('BNB');
        $('#BNB').attr("disabled", 'disabled');
        // bnb = [];
        // $('.markets').empty();
    }
}
var amount = null;
var alwais_same_amount = false;
function saveAmount() {
    // console.log($('#input_amount').val());
    if ($('#input_amount').val() !== '') {
        console.log($('#input_amount').val());
        amount = $('#input_amount').val();
    } else {
        alert('enter an amount')
    }
    alwais_same_amount = $('#check-amount').is(":checked");
    socket.emit('amount', {amount, alwais_same_amount})
}

// var amount = 0;
// function inputAmount(value) {
//     amount = value;
//     console.log(amount);
// }
// console.log($('#check_BTC'))
// if ($('#check_BTC').is(":checked")) {
//     console.log('check')
// }

var count = 0;
function addStrategy() {
    // console.log('addStrategy');
    // console.log($('.indicators').val());
    // console.log($('#value_indicator').val());
    // console.log($('.condition').val());


    console.log($('button.buy').hasClass('active'));
    console.log($('button.sell').hasClass('active'));

    if ($('.indicators').val() != null || $('.condition').val() != null || $('#value_indicator').val() != '') {
        var tr_indi = $('<tr />');

        var td_indi = $('<td>' + $('.indicators').val() + '</td>');
        var td_con = $('<td>' + $('.condition').val() + '</td>');
        var td_value = $('<td>' + $('#value_indicator').val() + '</td>');
        var td_delete = $('<td><input onclick="deleteStrategy(this.id)" value="X" id="' + count + '" class="min-content btn btn-danger btn-sm" type="submit"></td>');
        tr_indi.append(td_indi);
        tr_indi.append(td_con);
        tr_indi.append(td_value);
        tr_indi.append(td_delete);
        tr_indi.attr('id', count++);
        if ($('button.buy').hasClass('active')) {
            $(".tbody_value_strategy").append(tr_indi);
        }
        if ($('button.sell').hasClass('active')) {
            $(".tbody_value_strategy_sell").append(tr_indi);
        }
    }

    // $(".tbody_value_strategy").append(td_con);
    // $(".tbody_value_strategy").append(td_value);
}

function deleteStrategy(data) {
    console.log('deleteStrategy: ', data);
    $('#' + data).remove();
}

//ways to retrieve selected option and text outside handler
// console.log('Selected option value ' + $('select option').filter(':selected').val()); 
// console.log('Selected option value ' + $('select option').filter(':selected').text());

$('.time_frame').on('change', function () {
    //ways to retrieve selected option and text outside handler
    console.log('Changed option value ' + this.value);
    console.log('Changed option text ' + $(this).find('option').filter(':selected').text());
});

function saveConfiguration() {
    // console.log('saveConfiguration');
    // console.log($('select[name=time_frame] option').filter(':selected').val());
    // console.log($('select[name=markets] option').filter(':selected').val());
    // console.log($('select[name=order] option').filter(':selected').val());
    // console.log($('#check-candle').is(":checked"));
    var candle = $('select[name=time_frame] option').filter(':selected').val();
    var market = $('select[name=markets] option').filter(':selected').val();
    var order = $('select[name=order] option').filter(':selected').val();
    var wait_finish_candle = $('#check-candle').is(":checked");
    socket.emit('configuration', {candle, market, order, wait_finish_candle});
    // console.log($('.time_frame').filter(':selected').val());
    // console.log($('.markets').filter(':selected').val());
}
socket.on('time', function (data) {
    // console.log(data);
    $('#time').html(data);
    // $('#value_rsi').html()
    // socket.emit('receivedFromClient', { my: 'data' });
});

socket.on('send_rsi', function (data) {
    console.log('rsi: ', data);
    $('#value_rsi').html(data);
    // socket.emit('receivedFromClient', { my: 'data' });
});

socket.on('send_ema_1', function (data) {
    // console.log('send_ema_1: ', data);
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

function ema() {
    var input_period_ema = [];
    var period_ema_1 = $('#period_ema_1').val();
    var period_ema_2 = $('#period_ema_2').val();
    var period_ema_3 = $('#period_ema_3').val();
    input_period_ema.push(period_ema_1);
    input_period_ema.push(period_ema_2);
    input_period_ema.push(period_ema_3);
    console.log('period_emas: ', input_period_ema);
    socket.emit('period_ema', input_period_ema);
}

// function ema2() {
//     var period = $('#period_ema_2').val();
//     console.log('period_ema_2: ', period);
//     socket.emit('period_ema_2', $('#period_ema_2').val());
// }

// function ema3() {
//     var period = $('#period_ema_3').val();
//     console.log('period_ema_3: ', period);
//     socket.emit('period_ema_3', $('#period_ema_3').val());
// }

$(window).on('resize', function () {
    // This will execute whenever the window is resized
    console.log($(window).height()); // New height
    console.log($(window).width()); // New width
    // new TradingView.widget(
    //     {
    //         "width": $(window).width(),
    //         "height": $(window).height(),
    //         "symbol": "BINANCE:BTCUSDT",
    //         "interval": "D",
    //         "timezone": "Etc/UTC",
    //         "theme": "light",
    //         "style": "1",
    //         "locale": "es",
    //         "toolbar_bg": "#f1f3f6",
    //         "enable_publishing": false,
    //         "allow_symbol_change": true,
    //         "studies": [
    //             "RSI@tv-basicstudies"
    //         ],
    //         "container_id": "tradingview_03869"
    //     }
    // );
});

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
    // console.log(value)
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
    if (key !== '' && secret !== '') {
        data_user.push(key);
        data_user.push(secret);
        console.log(data_user);
        socket.emit('data_user', data_user);
    } else {
        console.log('error key is empty');
        alert('error key is empty');
    }
}

socket.on('error_api', function (data) {
    console.log('error api: ', data);
    alert('invalid api key');
})
