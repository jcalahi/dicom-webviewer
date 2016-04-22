var express = require('express'),
    path = require('path'),
    app = express(), // jshint ignore:line
    PORT = process.env.PORT || 8080; // jshint ignore:line

app.use(express.static(path.join(__dirname + '/public')));
app.use('/dicomviewer', express.static(path.join(__dirname + '/views')));

// Search route
app.use(require('./routes/search'));

// Load main page
app.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: __dirname + '/views'
    });
});

app.listen(PORT, function() {
    console.log('Server running on port:', PORT);
});


