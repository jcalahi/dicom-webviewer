function MainController(searchFactory, imageFactory) {
    var mc = this,
        datePattern = /(\d{4})(\d{2})(\d{2})/;
    // Contains list of objects
    mc.resultsList = [];
    // Contains fields to populate tags
    mc.patient = {};
    // Holds no. of results
    mc.totalHits = 0;
    mc.isLookUp = false;
    mc.query = {};
    /**
     * Modal search button function that calls the service
     * @param {Object} query - fields to look up in ES 
     */
    mc.searchBtn = function (query) {

        mc.isLookUp = true;

        searchFactory.getData(query).then(function (res) {
            if (res.data.message) {
                clearResults();
                $('#dicomImage').hide();
            } else {
                mc.resultsList = [];
                mc.totalHits = res.data.length;
                buildList(res.data);
            }
            // reset fields
            mc.query = {};
            // close modal
            $('#mySearch').modal('hide');
        });

    };
    /**
     * Displays the image and populates the DICOM tags
     * @param {Object} data - selected patient record to be displayed
     */
    mc.displayData = function (data) {
        
        mc.patient = data;
        mc.patient.PatientBirthDate = new Date(mc.patient.PatientBirthDate.replace(datePattern, '$1-$2-$3'));
        mc.patient.InstanceCreationDate = new Date(mc.patient.InstanceCreationDate.replace(datePattern, '$1-$2-$3'));
        
        imageFactory.loadImage(data.HDFSfilePath);
    };
    /**
     * Builds a list of records returned by the service
     * @param {Array} results - array of objects
     */
    function buildList(results) {
        angular.forEach(results, function (data) {
            mc.resultsList.push(data._source);
        });
    }

    function clearResults() {
        mc.resultsList = [];
        mc.totalHits = 0;
        mc.patient = {};
    }

}

module.exports = MainController;
