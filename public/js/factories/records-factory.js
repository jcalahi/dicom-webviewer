function recordsFactory($http, $httpParamSerializer) {

    return {
        getData: getData
    };

    function getData(patient) {
        var qs = $httpParamSerializer(patient);
        var str = qs.replace(/=/gi, ':');

        patient.queryString = str.replace(/&/gi, ' AND ');

        var req = {
            method: 'POST',
            url: '/_search',
            data: patient
        };

        return $http(req).then(function(response) {
            return response;
        });
    }
}

module.exports = recordsFactory;
