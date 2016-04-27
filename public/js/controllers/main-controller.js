function MainController(searchFactory, imageFactory) {
    var mc = this;
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
        
        imageFactory.setPath(data.HDFSfilePath).then(function (resp) {
            
            if (resp.data.path === 'error') {
                console.log('Image not found');
            } else {
                var path = resp.data.path,
                inc = path.indexOf('/images');
                imageFactory.loadImage(path.substring(inc, path.length));
            }
        });
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
