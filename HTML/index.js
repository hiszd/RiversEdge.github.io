$(function () {
    var socket = io();
    socket.on('reload-index', function() {
	location.reload();
    });
    socket.on('message', function(msg) {
	return;
    });
});
