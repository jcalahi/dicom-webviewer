var express = require('express'),
    es = require('elasticsearch'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express(), // jshint ignore:line
    PORT = process.env.PORT || 8080; // jshint ignore:line

var client = new es.Client({
    host: 'localhost:9200',
    log: 'info'
});

/*client.index({
    index: 'pacs',
    type: 'dicoms',
    id: '6',
    body: {
        "InstanceCreationDate": "20050726",
        "InstanceCreationTime": "103902",
        "StudyTime": "010100.000000",
        "AccessionNumber": "1",
        "Modality": "CT",
        "InstitutionName": "National Library of Medicine",
        "InstitutionAddress": "http://www-creatis.insa-lyon.fr/Public/Gdcm",
        "ReferringPhysicianName": "Unknown",
        "StudyDescription": "Visible Human Female",
        "SeriesDescription": "Resampled to 1mm voxels",
        "PatientName": "Jhing",
        "PatientID": "000-000-001",
        "PatientBirthDate": "20100101",
        "PatientBirthTime": "010100.000000",
        "PatientSex": "F",
        "SliceThickness": "1.0",
        "PatientPosition": "HFS",
        "StudyID": "1",
        "SeriesNumber": "1",
        "InstanceNumber": "66",
        "HDFSfilePath": "http://localhost:8080/dicomviewer/public/images/vhm.1035.dcm"
    }
}, function(error, response) {
    console.log(response);
});*/

app.use(bodyParser.urlencoded({
    extended: true
}));
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
    console.log(req.query);
    client.search({
        index: 'pacs',
        type: 'dicoms',
        q: req.query.q
    }).then(function(data) {
        res.json(data.hits.hits);
    }, function(err) {
        console.log(err.message);
    });
});

app.listen(PORT, function() {
    console.log('Server running on port:', PORT);
});
