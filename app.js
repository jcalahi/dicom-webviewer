var express = require('express'),
    es = require('elasticsearch'),
    path = require('path'),
    app = express(),
    PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname + '/public')));
app.use('/dicomviewer', express.static(path.join(__dirname + '/views')));

// Load main page
app.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: __dirname + '/views'
    });
});

app.listen(PORT, function() {
    console.log('Server running on port:', PORT);
});
