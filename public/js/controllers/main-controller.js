function MainController(searchFactory) {
    var mc = this;

    mc.query = {};

    mc.searchBtn = function(query) {
        console.log(query);
        /*searchFactory.getData(query).then(function(res) {
            // reset fields
            mc.query = {};
            console.log(res);
        });*/
    };
}

module.exports = MainController;
