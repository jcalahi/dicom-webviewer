var es = require('elasticsearch'),
    config = require('../config/es-config.js');

var client = new es.Client(config);

// client.index({
//     index: 'pacs',
//     type: 'dicoms',
//     id: '6',
//     body: {
//         "InstanceCreationDate": "20050726",
//         "InstanceCreationTime": "103902",
//         "StudyTime": "010100.000000",
//         "AccessionNumber": "1",
//         "Modality": "CT",
//         "InstitutionName": "National Library of Medicine",
//         "InstitutionAddress": "http://www-creatis.insa-lyon.fr/Public/Gdcm",
//         "ReferringPhysicianName": "Unknown",
//         "StudyDescription": "Visible Human Female",
//         "SeriesDescription": "Resampled to 1mm voxels",
//         "PatientName": "dennis",
//         "PatientID": "000-000-001",
//         "PatientBirthDate": "20100101",
//         "PatientBirthTime": "010100.000000",
//         "PatientSex": "F",
//         "SliceThickness": "1.0",
//         "PatientPosition": "HFS",
//         "StudyID": "1",
//         "SeriesNumber": "1",
//         "InstanceNumber": "66",
//         "HDFSfilePath": "/images/vhm.1035.dcm"
//     }
// }, function (error, response) {
//     console.log(response);
// });

module.exports = client;