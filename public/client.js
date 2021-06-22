console.log("client.js");
var socket = io.connect('http://localhost:3000');

socket.on('sendToClient', function(data) {
    console.log(data);

    socket.emit('receivedFromClient', { my: 'data' });
    $(document).ready(function() {
        M.AutoInit();
        $(".dropdown-trigger").dropdown();
        $('.sidenav').sidenav();
        M.Range.init($('input[type=range]'));
        $('select').formSelect();
    })
});