var ex = require('express');
var app = ex();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');

const cacheTime = 86400000 * 30;

app.use(ex.static(path.join(__dirname, 'HTML'), { maxAge: cacheTime}));

// Route for root
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, './HTML') });
});

// Route for iCampus
app.get('/icampus', function (req, res) {
    res.sendFile('icampus.html', { root: path.join(__dirname, './HTML') });
});

var icampus = io
    .of('/icampus')
    .on('connection', function(socket) {
	console.log('icampus user connected');
	socket.on('disconnect', function(){
	    console.log('icampus user disconnected');
	});
	fs.readFile(path.join(__dirname, 'HTML/icampus.part.html'), 'utf8', (err, data) => {
	    if(err) {
		console.log(err);
	    } else {
		socket.emit('content-stream', data);
		console.log('icampus sent');
	    }
	});
    })
    .on('log', function(msg) {
	console.log(msg);
    });

var index = io
    .of('/index')
    .on('connection', function(socket) {
	console.log('index user connected');
	socket.on('disconnect', function(){
	    console.log('index user disconnected');
	});
	fs.readFile(path.join(__dirname, 'HTML/index.part.html'), 'utf8', (err, data) => {
	    if(err) {
		console.log(err);
	    } else {
		socket.emit('content-stream', data);
		console.log('index sent:');
	    }
	});
    })

    .on('log', function(msg) {
	console.log(msg);
    });

var uni = io
    .of('/uni')
    .on('connection', function(socket) {
	console.log('uni user connected');
	socket.on('disconnect', function() {
	    console.log('uni user disconnected');
	});
    })
    .on('log', function(msg) {
	console.log(msg);
    });

fs.watchFile('./HTML/index.html', (curr, prev) => {
    index.emit('reload');
    console.log("index.html changed");
});

fs.watchFile('./HTML/index.js', (curr, prev) => {
    index.emit('reload');
    console.log("index.js changed");
});

fs.watchFile('./HTML/zion.min.css', (curr, prev) => {
    index.emit('reload');
    icampus.emit('reload');
    console.log("zion.min.css changed");
});

fs.watchFile('./HTML/languages.css', (curr, prev) => {
    index.emit('reload');
    icampus.emit('reload');
    console.log("languages.css changed");
});

fs.watchFile('./HTML/icampus.html', (curr, prev) => {
    icampus.emit('reload-icampus');
    console.log("icampus.html changed");
});

fs.watchFile('./HTML/icampus.js', (curr, prev) => {
    icampus.emit('reload-icampus');
    console.log("icampus.js changed");
});

// Listen to port
http.listen(8080, function(){
    console.log("Listening on port 8080!");
});
