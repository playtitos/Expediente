expediente.controller("cHome", function ($scope, $http, $state) {

    $scope.urlGeneral = document.location.protocol + "//" + document.location.hostname + ":" + document.location.port + '/Expediente/';

    /***** FUNCIONES HOME *****/
    $scope.init_app_expedinete = function () {
        $scope.crea_menu();
    };

    $scope.crea_menu = function () {
        $scope.muestra_alertas('', '');
        $scope.secciones = [{
                estado: 'inactivo',
                nombre: 'Principal',
                alias: 'principal'
            },
            {
                estado: 'inactivo',
                nombre: 'Expediente',
                alias: 'expediente'
            },
        ];
        $scope.valida_ruta();
    };

    $scope.cambia_vista_seccion = function (secc) {
        for (const index in $scope.secciones) {
            ($scope.secciones[index].alias !== secc) ? $scope.secciones[index].estado = 'inactivo': $scope.secciones[index].estado = 'activo';
        }
        $state.go(secc, {
            reload: true
        });
    };

    $scope.muestra_alertas = function (tipo, texto) {
        $scope.alerta_error = false;
        $scope.alerta_exito = false;
        $scope.mensaje_error = "";
        $scope.mensaje_exito = "";
        switch (tipo) {
            case 'exito':
                $scope.alerta_exito = true;
                $scope.mensaje_exito = texto;
                break;
            case 'error':
                $scope.alerta_error = true;
                $scope.mensaje_error = texto;
                break;
            case '':
                break;
        }
    };

    window.onhashchange = function () {
        $scope.cambia_vista_seccion(document.location.hash.replace('#/', ''))
    }

    /***** FUNCIONES GENERALES *****/
    var sort_by = function (campo, reverse, primer) {
        var key = primer ? function (x) {
            return primer(x[campo])
        } : function (x) {
            return x[campo]
        };
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    };

    $scope.filtrar_por = function (arreglo, filtro, valor) {
        return arreglo.sort(sort_by(filtro, valor, function (a) {
            return a
        }));
    };

    /***** VALIDACIONES *****/
    $scope.valida_ruta = function () {
        (document.location.hash === '') ? $scope.cambia_vista_seccion($scope.secciones[0].alias): $scope.cambia_vista_seccion(document.location.hash.replace('#/', ''));
    };

    $scope.validaDato = function (dato) {
        return dato === null || dato === undefined || dato === "null" ? '' : dato;
    };

    $scope.validaRFC = function (rfc) {
        var rfcRegex = /^[A-Za-zñÑ]{3,4}[0-9]{2}(0[1-9]{1}|1[0-2]{1})(0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[A-Za-z0-9]{0,3}$/;
        return rfcRegex.test(rfc);
    };

    $scope.validaCURP = function (curp) {
        var curpRegex = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;
        return curpRegex.test(curp);
    };

    $scope.cambia_fecha = function (fecha) {
        var dd = fecha.getDate();
        var mm = fecha.getMonth() + 1;
        var yyyy = fecha.getFullYear();
        (dd < 10) ? (dd = '0' + dd) : ('');
        (mm < 10) ? (mm = '0' + mm) : ('');
        return (yyyy + mm + dd);
    };

    $scope.cambia_sexo = function (valor, tipo) {
        return (tipo === 'mf') ? ((valor === '1') ? (valor = 'M') : (valor = 'F')) : ((valor === 'M') ? (valor = 1) : (valor = 2));
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

    $scope.peticionPost = function (url, datos, fnExito) {
        var request = $http.post(url, datos, {
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