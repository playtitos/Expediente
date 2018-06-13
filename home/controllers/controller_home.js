expediente.controller("cExpediente", function ($scope, $http, $state) {

    $scope.init_app_expedinete = function () {
        $scope.crea_menu();
    };

    $scope.crea_menu = function () {
        $scope.secciones = [
            { estado: 'inactivo', nombre: 'Principal', alias: 'principal' },
            { estado: 'inactivo', nombre: 'Expediente', alias: 'expediente' },
        ];
        $state.go('principal', { reload: true });
    };

    $scope.cambia_vista_seccion = function (secc) {
        var seccion = secc.alias;
        switch (seccion) {
            case 'principal':

                break;
            case 'expediente':

                break;
            default:
                break;
        }
        $state.go(seccion, { reload: true });
    };
});