console.log("client.js");
var socket = io.connect('http://localhost:3000');

$(document).ready(function() {
    M.AutoInit();
    $(".dropdown-trigger").dropdown();
    $('.sidenav').sidenav();
    M.Range.init($('input[type=range]'));
    $('select').formSelect();
    $('.tabs').tabs();
})

socket.on('serverTime', function(data) {
    // console.log(data);
    $('#time').html(data);
    // $('#value_rsi').html()
    // socket.emit('receivedFromClient', { my: 'data' });
});

socket.on('send_rsi', function(data) {
    // console.log(data);
    $('#value_rsi').html(data);
    // socket.emit('receivedFromClient', { my: 'data' });
});