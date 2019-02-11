var ex = require('express');
var app = ex();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

const cacheTime = 86400000 * 30;

app.use(ex.static("HTML", { maxAge: cacheTime}));

// Route for root
app.get('/', function (req, res) {
    res.sendFile("/HTML/index.html");
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function(){
	console.log('user disconnected');
    });
});

fs.watchFile('./HTML/index.html', (curr, prev) => {
    io.emit('reload');
    console.log("index.html changed");
});

fs.watchFile('./HTML/index.js', (curr, prev) => {
    io.emit('reload');
    console.log("index.js changed");
});

fs.watchFile('./HTML/zion.min.css', (curr, prev) => {
    io.emit('reload');
    console.log("zion.min.css changed");
});

// Listen to port
http.listen(8080, function(){
    console.log("Listening on port 8080!");
});
