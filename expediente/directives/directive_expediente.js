secc_expediente.directive('dirTablaExpediente', [function () {
    return {
        restrict: 'E',
        transclude: true,
        replace: false,
        scope: true,
        templateUrl: '../../expediente/views/tabla_expediente.html'
    };
}]);