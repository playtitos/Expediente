secc_expediente.controller("cExpediente", function ($scope) {

    var sort_by = function (campo, reverse, primer) {
        var key = primer ? function (x) { return primer(x[campo]) } : function (x) { return x[campo] };
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    };

    var lista_errores = {
        'curp': 'El curp debe contener 4 letras, 6 dígitos, 6 letras y 2 dígitos',
        'nombre': 'json/getMetricaDispositivos',
    };

    $scope.init_expediente = function () {
        $scope.peticionGet($scope.urlGeneral + 'commons/src/estados.json', $scope.exito_estados);
        $scope.peticionGet($scope.urlGeneral + 'commons/src/nacionalidad.json', $scope.exito_nacionalidad);
        $scope.peticionGet($scope.urlGeneral + 'commons/src/municipios.json', $scope.exito_municipios);
        $scope.dis_municipio = true;
        $scope.dis_est_nac = true;
    };

    $scope.exito_estados = function (response) {
        $scope.estados = [];
        for (const index in response) {
            var obj = { id: response[index].id, nombre: response[index].name.toUpperCase() };
            $scope.estados.push(obj);
        }
        $scope.estados = $scope.filtrar_por($scope.estados, 'nombre', false);
    };

    $scope.exito_nacionalidad = function (response) {
        $scope.nacionalidades = [];
        for (const index in response) {
            var obj = { id: response[index].clave_nacionalidad, nombre: response[index].pais.toUpperCase() };
            $scope.nacionalidades.push(obj);
        }
        $scope.nacionalidades = $scope.filtrar_por($scope.nacionalidades, 'nombre', false);
    };

    $scope.exito_municipios = function (response) {
        $scope.municipios = [];
        $scope.lista_municipios = [];
        for (const index in response) {
            var obj = { id: response[index].inegi_id, nombre: response[index].nombre.toUpperCase(), id_estado: response[index].id_estado };
            $scope.municipios.push(obj);
        }
    };

    $scope.valida_campo = function (campo, valor) {
        var validacion = true;
        switch (campo) {
            case 'curp':
                //validacion = $scope.validaRFC(valor);
                validacion = $scope.validaCURP(valor);
                break;

            default:
                break;
        }
        (!validacion) ? ($scope.muestra_alertas('error', lista_errores[campo])) : ($scope.muestra_alertas('', ''));
    };

    $scope.filtra_municipio = function (estado) {
        var municipios = $scope.municipios.filter(function (municipio) {
            return municipio.id_estado === estado;
        });
        municipios = $scope.filtrar_por(municipios, 'nombre', false);
        $scope.lista_municipios = municipios;
        $scope.dis_municipio = false;
    };

    $scope.nac_cambio = function (nac) {
        $scope.estado_nacimiento = '';
        (nac == 'MEX') ? $scope.dis_est_nac = false : $scope.dis_est_nac = true;
    };
});