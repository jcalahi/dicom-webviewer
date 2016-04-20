function MainController(recordsFactory) {
    var mc = this;

    mc.patient = {};

    mc.searchBtn = function(patient) {
        recordsFactory.getData(patient).then(function(res) {
            console.log(res);
        });
    };
}

module.exports = MainController;
