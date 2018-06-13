expediente.directive('dirMenu', [function () {
    return {
        restrict: 'E',
        transclude: true,
        replace: false,
        scope: true,
        templateUrl: '../views/menu.html'
    };
}]);