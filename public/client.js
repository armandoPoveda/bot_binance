console.log("client.js");
var socket = io.connect('http://localhost:3000');
// var sidenav = null;

$(function () {
    // M.AutoInit();
    // $(".dropdown-trigger").dropdown();
    // $('.sidenav').sidenav();
    // M.Range.init($('input[type=range]'));
    // $('select').formSelect();
    // $('.tabs').tabs();
    // console.log('init')
    // $(".my_tabs").hide();  /*Instead of hiding .panel here you can hide it by using css for first time */
  
    $('.move').on('click', function (e) {
        console.log('move event', e)
        // d.style.position = "absolute";
        var x = e.pageX;
        var y = e.pageY;
        var el = $(".prueba");
        el.css('position', 'absolute');
        el.css("left", x +'px');
        el.css("top", y + 'px');
    })
    var count = 0;
    $('.nav-btn').on('click', function (e) {
        console.log('nav-btn: ', e);
        $('.header').css('opacity', '0.9');
        if (count === 0) {
            $('.header-nav').addClass('active', 'active');
            $('body').css('overflow', 'hidden');
            count = 1;
        } else {
            $('.header-nav').removeClass('active', 'active');
            $('body').css('overflow', '');
            count = 0;
        }
    })

})

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

socket.on('markets', function (data) {
    console.log('markets: ', data);
    // var select = $(".markets");
    // console.log(select);
    data.sort();
    data.forEach(value => {
        if (value.includes('/USDT') || value.includes('/BNB') || value.includes('/BTC') || value.includes('/ETH')) {
            var option = new Option(value, value);
            $(option).html(value);
            $(".markets").append(option);
        }
    });
})

socket.on('balance', function (data) {
    console.log('balance....: ', data);
    console.log($(".tbody_balance"))
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            // var option = new Option(key, data[key]);
            if (key === 'USDT' || key === 'BNB' || key === 'BTC' || key === 'ETH') {
                var tr = $('<tr />')
                var th = $("<td />");
                var td = $("<td />");
                var td_input_amount = $('<td><input oninput="inputAmount(this.value)" id="' + key + '" disabled class="min-content input-small" placeholder="' + key + '" type="number"></input></td>');
                var td_input = $('<td><label>' + '<input value="' + key + '" oninput="checkBoxConfiguration(this.value)" id="check_' + key + '" type="radio" name="house"/></label></td>');
                th.html(key);
                td.html(data[key]);
                tr.append(th);
                tr.append(td);
                tr.append(td_input_amount);
                tr.append(td_input);
                // console.log(tr)
                $(".tbody_balance").append(tr);
            }
        }
        $('#USDT').val(data[key]);
    }
    $('#USDT').removeAttr("disabled");
    $('#check_USDT').attr('checked', 'checked');
});

function checkBoxConfiguration(value) {
    console.log(value);
    if (value === 'BTC') {
        $('#BTC').removeAttr("disabled");
        $('#check_BTC').attr('checked', 'checked');
    } else {
        $('#BTC').val('BTC');
        $('#BTC').attr("disabled", 'disabled');
    }

    if (value === 'USDT') {
        $('#USDT').removeAttr("disabled");
        $('#check_USDT').attr('checked', 'checked');
    } else {
        $('#USDT').val('USDT');
        $('#USDT').attr("disabled", 'disabled');
    }

    if (value === 'ETH') {
        $('#ETH').removeAttr("disabled");
        $('#check_ETH').attr('checked', 'checked');
    } else {
        $('#ETH').val('ETH');
        $('#ETH').attr("disabled", 'disabled');
    }

    if (value === 'BNB') {
        $('#BNB').removeAttr("disabled");
        $('#check_BNB').attr('checked', 'checked');
    } else {
        $('#BNB').val('BNB');
        $('#BNB').attr("disabled", 'disabled');
    }
}

function inputAmount(value) {
    console.log(value);
}
// console.log($('#check_BTC'))
// if ($('#check_BTC').is(":checked")) {
//     console.log('check')
// }



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
    data_user.push(key);
    data_user.push(secret);
    console.log(data_user);
    socket.emit('data_user', data_user);
}

// move elements
