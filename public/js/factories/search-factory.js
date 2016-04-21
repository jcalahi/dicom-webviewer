function searchFactory($http, $httpParamSerializer) {

    return {
        getData: getData
    };

    function getData(patient) {
        var qs = $httpParamSerializer(patient);
        var str = qs.replace(/=/gi, ':');

        patient.queryString = str.replace(/&/gi, ' AND ');

        var req = {
            method: 'GET',
            url: '/_search',
            params: {
                q: patient.queryString
            }
        };

        return $http(req).then(function(response) {
            return response;
        });
    }
}

module.exports = searchFactory;
