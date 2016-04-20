function recordsFactory($http, $httpParamSerializer) {

    return {
        getData: getData
    };

    function getData(patient) {
        var qs = $httpParamSerializer(patient);
        console.log(qs.replace(/=/gi, ':'));
        var req = {
            method: 'GET',
            url: '/_search',
            params: {
                q: qs.replace(/=/gi, ':')
            }
        };

        return $http(req).then(function(response) {
            return response;
        });
    }
}

module.exports = recordsFactory;
