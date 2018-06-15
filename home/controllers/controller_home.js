expediente.controller("cHome", function ($scope, $http, $state) {

    $scope.urlGeneral = document.location.protocol + "//" + document.location.hostname + ":" + document.location.port + '/Expediente/';

    /***** FUNCIONES HOME *****/
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

    $scope.cambia_vista_seccion = function (secc) {
        for (const index in $scope.secciones) {
            ($scope.secciones[index].alias !== secc) ? $scope.secciones[index].estado = 'inactivo' : $scope.secciones[index].estado = 'activo';
        }
        $state.go(secc, { reload: true });
    };

    window.onhashchange = function () {
        $scope.cambia_vista_seccion(document.location.hash.replace('#/', ''))
    }

    /***** FUNCIONES GENERALES *****/
    var sort_by = function (campo, reverse, primer) {
        var key = primer ? function (x) { return primer(x[campo]) } : function (x) { return x[campo] };
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    };

    $scope.filtrar_por = function (arreglo, filtro, valor) {
        return arreglo.sort(sort_by(filtro, valor, function (a) { return a }));
    };

    /***** VALIDACIONES *****/
    $scope.valida_ruta = function () {
        (document.location.hash === '') ? $scope.cambia_vista_seccion($scope.secciones[0].alias) : $scope.cambia_vista_seccion(document.location.hash.replace('#/', ''));
    };

    $scope.validaDato = function (dato) {
        return dato === null || dato === undefined || dato === "null" ? '' : dato;
    };


    /********* PETICIONES ********/
    $scope.peticionGet = function (url, fnExito) {
        fetch(url).then((resp) => resp.json())
            .then((data) => {
                fnExito(data);
            })
            .catch(function (error) {
                console.log(error);
            });
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
});