function recordsFactory($http) {

    return {
        getData: getData
    };

    function getData(patient) {
        var req = {
            method: 'GET',
            url: '/_search',
            /*params: {
                patientName: patient.name,
                patiendId: patient.id,
                patientBirthDate: patient.birthDate
            }*/
            params: {
                q: "name:" + patient.name
            }
        };

        return $http(req).then(function(response) {
            return response;
        });
    }
}

module.exports = recordsFactory;
