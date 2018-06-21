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
        $scope.peticionGet($scope.urlGeneral + 'commons/src/listado.json', $scope.preparaListados);
        $scope.peticionGet($scope.urlGeneral + 'commons/src/nacionalidad.json', $scope.exitoNacionalidad);
        $scope.dis_municipio = true;
        $scope.dis_Localidades = true;
        $scope.dis_est_nac = true;
    };

    $scope.preparaListados = function (response) {
        $scope.estados = [];
        $scope.listadoCompleto = response.results;
        let listaEstados = [];
        response.results.map((elemento) => {
            if (!listaEstados.includes(elemento.NOM_ENT)) {
                var obj = { id_estado: elemento.CVE_ENT, nombre_estado: elemento.NOM_ENT.toUpperCase() }
                $scope.estados.push(obj);
                listaEstados.push(elemento.NOM_ENT);
            }
        });
        $scope.estados = $scope.filtrar_por($scope.estados, 'nombre_estado', false);
    };

    $scope.exitoNacionalidad = function (response) {
        $scope.nacionalidades = [];
        for (const index in response) {
            var obj = { id: response[index].clave_nacionalidad, nombre: response[index].pais.toUpperCase() };
            $scope.nacionalidades.push(obj);
        }
        $scope.nacionalidades = $scope.filtrar_por($scope.nacionalidades, 'nombre', false);
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
        $scope.municipios = [];
        let listaMunicipios = [];
        $scope.listadoCompleto.map((elemento) => {
            if ((!listaMunicipios.includes(elemento.NOM_MUN)) && (elemento.CVE_ENT === estado)) {
                var obj = { id_municipio: elemento.CVE_MUN, nombre_municipio: elemento.NOM_MUN.toUpperCase() }
                $scope.municipios.push(obj);
                listaMunicipios.push(elemento.NOM_MUN);
            }
        });
        $scope.municipios = $scope.filtrar_por($scope.municipios, 'nombre_municipio', false);
        $scope.dis_municipio = false;
        $scope.municipio = '';
    };

    $scope.filtraLocalidad = function (municipio) {
        $scope.localidades = [];
        let listaLocalidades = [];
        $scope.listadoCompleto.map((elemento) => {
            if ((!listaLocalidades.includes(elemento.NOM_LOC)) && (elemento.CVE_MUN === municipio)) {
                var obj = { id_localidad: elemento.CVE_LOC, nombre_localidad: elemento.NOM_LOC.toUpperCase() }
                $scope.localidades.push(obj);
                listaLocalidades.push(elemento.NOM_LOC);
            }
        });
        $scope.localidades = $scope.filtrar_por($scope.localidades, 'nombre_localidad', false);
        $scope.dis_Localidades = false;
        $scope.localidad = '';
    };

    $scope.nac_cambio = function (nac) {
        $scope.estado_nacimiento = '';
        (nac == 'MEX') ? $scope.dis_est_nac = false : $scope.dis_est_nac = true;
    };
});