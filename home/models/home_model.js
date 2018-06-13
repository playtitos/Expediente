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
        })/*.state('convenio', {
            name: 'convenio',
            url: '/convenio',
            templateUrl: "../../convenio/views/convenio.html"
        }).state('reportes', {
            name: 'reportes',
            url: '/reportes',
            templateUrl: "../../reportes/reportes/views/reportes.html"
        }).state('catalogogeneral', {
            name: 'catalogogeneral',
            url: '/catalogogeneral',
            templateUrl: "../../catalogos/views/catalogos.html"
        }).state('perfil', {
            name: 'perfil',
            url: '/perfil',
            templateUrl: "../../perfil/views/perfil.html"
        })*/;
    $urlRouterProvider.otherwise('/principal');
});