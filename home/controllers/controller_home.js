expediente.controller("cExpediente", function ($scope, $http, $state) {

    $scope.init_app_expedinete = function () {
        $scope.crea_menu();
    };

    $scope.crea_menu = function () {
        $scope.secciones = [
            { estado: 'inactivo', nombre: 'Principal', alias: 'principal' },
            { estado: 'inactivo', nombre: 'Expediente', alias: 'expediente' },
        ];
        $scope.valida_ruta();
    };

    $scope.valida_ruta = function () {
        (document.location.hash === '') ? $scope.cambia_vista_seccion($scope.secciones[0].alias) : $scope.cambia_vista_seccion(document.location.hash.replace('#/', ''));
    };

    $scope.cambia_vista_seccion = function (secc) {
        for (const index in $scope.secciones) {
            ($scope.secciones[index].alias !== secc) ? $scope.secciones[index].estado = 'inactivo' : $scope.secciones[index].estado = 'activo';
        }
        $state.go(secc, { reload: true });
    };

    window.onhashchange = function () {
        $scope.cambia_vista_seccion(document.location.hash.replace('#/', ''))
    }
});