var expediente = angular.module('expediente', ['ui.router', 'secc_expediente']);

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