function MainController(recordsFactory) {
    var mc = this;

    mc.query = {};

    mc.searchBtn = function(query) {
        recordsFactory.getData(query).then(function(res) {
            // reset fields
            mc.query = {};
            console.log(res);
        });
    };
}

module.exports = MainController;
