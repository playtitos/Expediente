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
        'curp_vacio': 'Es necesario capturar el CURP',
        'nombre': 'Es necesario capturar el nombre',
        'apellido': 'Es necesario capturar el primer apellido',
        'fecha': 'Es necesario capturar la fecha de nacimiento',
        'sexo': 'Es necesario capturar el sexo',
        'nacionalidad': 'Es necesario capturar la nacionalidad',
        'estado_nacimiento': 'Es necesario capturar el estado de nacimiento',
        'estado_residencia': 'Es necesario capturar el estado de residencia',
        'municipio': 'Es necesario capturar el municipio',
        'localidad': 'Es necesario capturar la localidad'
    };

    $scope.init_expediente = function () {
        $scope.borraErrores();
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
                var obj = { id_estado: elemento.CVE_ENT, nombre_estado: elemento.NOM_ENT.toUpperCase() };
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
        $scope.borraErrores();
        let validacion = $scope.validaCURP(valor);
        (!validacion) ? ($scope.muestra_alertas('error', lista_errores[campo]), $scope.error_curp = 'error') : ('');
    };

    $scope.filtra_municipio = function (estado) {
        $scope.borraErrores();
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
        $scope.borraErrores();
        $scope.localidades = [];
        //let listaLocalidades = [];
        $scope.listadoCompleto.map((elemento) => {
            if ($scope.estado_residencia === elemento.CVE_ENT && municipio === elemento.CVE_MUN) {
                //if ((!listaLocalidades.includes(elemento.NOM_LOC)) && (elemento.CVE_MUN === municipio)) {
                var obj = { id_localidad: elemento.CVE_LOC, nombre_localidad: elemento.NOM_LOC.toUpperCase() }
                $scope.localidades.push(obj);
                //listaLocalidades.push(elemento.NOM_LOC);
            }
        });
        $scope.localidades.push({ id_localidad: 0000, nombre_localidad: 'OTRA, NO ESPECIFICADA EN EL CATÁLOGO' })
        $scope.localidades = $scope.filtrar_por($scope.localidades, 'nombre_localidad', false);
        $scope.dis_Localidades = false;
        $scope.localidad = '';
    };

    $scope.nac_cambio = function (nac) {
        $scope.borraErrores();
        $scope.estado_nacimiento = '';
        (nac == 'MEX') ? $scope.dis_est_nac = false : $scope.dis_est_nac = true;
    };

    $scope.guardarRegistro = function () {
        $scope.borraErrores();
        $scope.apsegundo = $scope.validaDato($scope.apsegundo);
        if ($scope.validaDato($scope.curp) === '') {
            $scope.muestra_alertas('error', lista_errores['curp_vacio']);
            $scope.error_curp = 'error';
        } else if ($scope.validaDato($scope.apprimero) === '') {
            $scope.muestra_alertas('error', lista_errores['apellido']);
            $scope.error_apprimero = 'error';
        } else if ($scope.validaDato($scope.nombre) === '') {
            $scope.muestra_alertas('error', lista_errores['nombre']);
            $scope.error_nombre = 'error';
        } else if ($scope.validaDato($scope.fecnac) === '') {
            $scope.muestra_alertas('error', lista_errores['fecha']);
            $scope.error_fecnac = 'error';
        } else if ($scope.validaDato($scope.sexo) === '') {
            $scope.muestra_alertas('error', lista_errores['sexo']);
            $scope.error_sexo = 'error';
        } else if ($scope.validaDato($scope.nacionalidad) === '') {
            $scope.muestra_alertas('error', lista_errores['nacionalidad']);
            $scope.error_nacionalidad = 'error';
        } else if ($scope.nacionalidad === 'MEX' && $scope.validaDato($scope.estado_nacimiento) === '') {
            $scope.muestra_alertas('error', lista_errores['estado_nacimiento']);
            $scope.error_estado_nacimiento = 'error';
        } else if ($scope.validaDato($scope.estado_residencia) === '') {
            $scope.muestra_alertas('error', lista_errores['estado_residencia']);
            $scope.error_estado_residencia = 'error';
        } else if ($scope.validaDato($scope.municipio) === '') {
            $scope.muestra_alertas('error', lista_errores['municipio']);
            $scope.error_municipio = 'error';
        } else if ($scope.validaDato($scope.localidad) === '') {
            $scope.muestra_alertas('error', lista_errores['localidad']);
            $scope.error_localidad = 'error';
        } else {
            $scope.enviaRegistros();
        }
    };

    $scope.enviaRegistros = function () {
        console.log($scope.curp);
        console.log($scope.apprimero);
        console.log($scope.apsegundo);
        console.log($scope.nombre);
        console.log($scope.fecnac);
        console.log($scope.sexo);
        console.log($scope.nacionalidad);
        console.log($scope.estado_nacimiento);
        console.log($scope.estado_residencia);
        console.log($scope.municipio);
        console.log($scope.localidad);
    };

    $scope.borraErrores = function () {
        $scope.muestra_alertas('', '');
        $scope.error_curp = '';
        $scope.error_apprimero = '';
        $scope.error_nombre = '';
        $scope.error_fecnac = '';
        $scope.error_sexo = '';
        $scope.error_nacionalidad = '';
        $scope.error_estado_nacimiento = '';
        $scope.error_estado_residencia = '';
        $scope.error_municipio = '';
        $scope.error_localidad = '';
    };
});