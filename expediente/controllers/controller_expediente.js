secc_expediente.controller("cExpediente", function ($scope, $http) {

    $scope.init_expediente = function () {
        let url = $scope.urlGeneral + '/Expediente/commons/src/estados.json';
        $scope.peticionGet(url, $scope.exito_estados);
    };

    $scope.exito_estados = function (response) {
        $scope.estados = [];
        for (const index in response) {
            var obj = { id: response[index].id, nombre: response[index].name, };
            $scope.estados.push(obj);
        }
    };
});