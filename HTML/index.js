$(function () {
    var socket = io();
    socket.on('reload', function() {
	location.reload();
    });
    socket.on('message', function(msg) {
	return;
    });
});
