function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.state('main', {
        url: '/',
        controller: 'MainController',
        controllerAs: 'mainCtrl',
        templateUrl: 'main-page/main.html'
    });

    $locationProvider.html5Mode(true);
}

module.exports = config;
