var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    app = express(), // jshint ignore:line
    PORT = process.env.PORT || 3100; // jshint ignore:line

app.use(express.static(path.join(__dirname + '/public')));
app.use(favicon(path.join(__dirname + '/public/images/optum_favicon.ico')));
app.use('/dicomviewer', express.static(path.join(__dirname + '/views')));

// Load controllers
app.use(require('./controllers'));

// Load main page
app.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: __dirname + '/views'
    });
});

app.listen(PORT, function() {
    console.log('Server running on port:', PORT);
});