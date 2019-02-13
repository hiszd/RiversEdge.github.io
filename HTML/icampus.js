$(function () {
    var socket = io.connect('/icampus'),
	uni = io.connect('/uni');
    socket.on('reload', function() {
	location.reload();
    });
    socket.on('content-stream', function(html) {
	if(!$(".wrapper").length) {
	    $("body").prepend(html);
	    console.log("Content Appended")
	    uni.emit('log', "Content Appended");
	} else {
	    console.log("Content Existing");
	    uni.emit('log', "Content Existing");
	}
    });
    socket.on('message', function(content) {
	
    });
});
