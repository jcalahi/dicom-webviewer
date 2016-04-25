var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    WebHDFS = require('webhdfs'),
    app = express(), // jshint ignore:line
    PORT = process.env.PORT || 3000; // jshint ignore:line

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

var hdfs = WebHDFS.createClient({
    user: 'dlpocid',
    host: 'apsrd4190',
    port: 50070
});


var readFileStream = hdfs.createReadStream("/datalake/corporate/ses_dlpoc/dmundada/pacsstorage/DICOMFile_Eve_000-000-001_1_41_103851_1460639710047.dcm");

readFileStream.on('error', function(error) {
    console.log(error);
});

readFileStream.on('data', function(chunk) {
    console.log(chunk);
});

app.listen(PORT, function() {
    console.log('Server running on port:', PORT);
});