function MainController(searchFactory, imageFactory) {
    var mc = this;
    // Holds no. of results
    mc.totalHits = 0;
    // Contains list of objects
    mc.resultsList = [];
    // Contains fields to populate tags
    mc.patient = {};
    mc.queryString = '';
    mc.query = {};
    /**
     * Modal search button function that calls the service
     * @param {Object} query - fields to look up in ES 
     */
    mc.searchBtn = function(query) {
        searchFactory.getData(query).then(function(res) {
            
            mc.totalHits = res.data.length;
            
            buildList(res.data);
            // reset fields
            mc.query = {};
        });
    };
    /**
     * Displays the image and populates the DICOM tags
     * @param {Object} data - selected patient record to be displayed
     */
    mc.displayData = function(data) {
        mc.patient = data;
        imageFactory.loadImage(data.HDFSfilePath);
    };
    /**
     * Builds a list of records returned by the service
     * @param {Array} results - array of objects
     */
    function buildList(results) {
        angular.forEach(results, function(data) {
            mc.resultsList.push(data._source);
        });
    }
    
}

module.exports = MainController;
