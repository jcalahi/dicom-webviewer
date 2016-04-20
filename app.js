var express = require('express'),
    es = require('elasticsearch'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express(),
    PORT = process.env.PORT || 8080;

var client = new es.Client({
    host: 'localhost:9200',
    log: 'info'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/public')));
app.use('/dicomviewer', express.static(path.join(__dirname + '/views')));

// Load main page
app.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: __dirname + '/views'
    });
});

app.get('/_search', function(req, res) {

    client.search({
        index: 'sample',
        type: 'document',
        query: req.query

    }).then(function(data) {
        res.json(data);
    }, function(err) {
        console.log(err.message);
    });
});

app.listen(PORT, function() {
    console.log('Server running on port:', PORT);
});
