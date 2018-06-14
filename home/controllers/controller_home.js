expediente.controller("cHome", function ($scope, $http, $state) {

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

    $scope.peticionGet = function (archivo, datos, fnExito, fnError) {
        var request = $http.get(archivo, datos, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
            },
            timeout: 600000
        });

        if (typeof (fnError) !== "undefined") {
            request.then(function (response) {
                fnExito(response);
            }, fnError);
        } else {
            request.then(function (response) {
                fnExito(response);
            });
        }
    };

    $scope.peticionPost = function (archivo, datos, fnExito, fnError) {
        var request = $http.post(archivo, datos, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
            },
            timeout: 600000
        });

        if (typeof (fnError) !== "undefined") {
            request.then(function (response) {
                fnExito(response);
            }, fnError);
        } else {
            request.then(function (response) {
                fnExito(response);
            });
        }
    };

    window.onhashchange = function () {
        $scope.cambia_vista_seccion(document.location.hash.replace('#/', ''))
    }
});