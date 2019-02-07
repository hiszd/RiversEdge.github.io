var ex = require('express');
var app = ex();
var path = require('path');
var router = ex.Router();

app.use(ex.static("HTML"));

// Route for root
router.get('/', function (req, res) {
    res.sendFile("/HTML/index.html");
});

app.use('/', router);

// Listen to port
app.listen(8080);
console.log("Listening on port 8080!");
