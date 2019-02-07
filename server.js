var ex = require('express');
var app = ex();
var path = require('path');
var router = ex.Router();

const cacheTime = 86400000 * 30

app.use(ex.static("HTML", { maxAge: cacheTime}));

// Route for root
router.get('/', function (req, res) {
    res.sendFile("/HTML/index.html");
});

app.use('/', router);

// Listen to port
app.listen(8080);
console.log("Listening on port 8080!");
