secc_expediente.controller("cExpediente", function ($scope) {

    var sort_by = function (campo, reverse, primer) {
        var key = primer ? function (x) { return primer(x[campo]) } : function (x) { return x[campo] };
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    };

    $scope.init_expediente = function () {
        $scope.peticionGet($scope.urlGeneral + 'commons/src/estados.json', $scope.exito_estados);
        $scope.peticionGet($scope.urlGeneral + 'commons/src/nacionalidad.json', $scope.exito_nacionalidad);
    };

    $scope.exito_estados = function (response) {
        $scope.estados = [];
        for (const index in response) {
            var obj = { id: response[index].id, nombre: response[index].name, };
            $scope.estados.push(obj);
        }
        $scope.estados = $scope.filtrar_por($scope.estados, 'nombre', false);
    };

    $scope.exito_nacionalidad = function (response) {
        $scope.nacionalidades = [];
        for (const index in response) {
            var obj = { id: response[index].clave_nacionalidad, nombre: response[index].pais, };
            $scope.nacionalidades.push(obj);
        }
        $scope.nacionalidades = $scope.filtrar_por($scope.nacionalidades, 'nombre', false);
    };
});