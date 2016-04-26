function searchFactory($http, $httpParamSerializer) {

    return {
        getData: getData
    };
    /**
     * Queries the Elastic Search and returns the patient record
     * @param {Object} patient - selected patient record to be displayed
     */
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
            
            angular.forEach(response.data, function(val) {
                val._source.PatientBirthDate = dateUtil(val._source.PatientBirthDate);
                val._source.InstanceCreationDate = dateUtil(val._source.InstanceCreationDate);
            });
            
            return response;
        });
    }
    /**
     * Converts date YYYYMMDD to long date format
     * @param {String} inputDate - date to be converted
     */
    function dateUtil(inputDate) {
        var datePattern = /(\d{4})(\d{2})(\d{2})/;
        return new Date(inputDate.replace(datePattern, '$1-$2-$3'));
    }
}

module.exports = searchFactory;
