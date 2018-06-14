var expediente = angular.module('expediente', ['ui.router']);

expediente.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('principal', {
            name: 'principal',
            url: '/principal',
            templateUrl: "../../principal/views/principal.html"
        }).state('expediente', {
            name: 'expediente',
            url: '/expediente',
            templateUrl: "../../expediente/views/expediente.html"
        });
    $urlRouterProvider.otherwise('/principal');
});