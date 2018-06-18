expediente.directive('dirMenu', [function () {
    return {
        restrict: 'E',
        transclude: true,
        replace: false,
        scope: true,
        templateUrl: '../views/menu.html'
    };
}]);

expediente.directive('dirAlertas', [function () {
    return {
        restrict: 'E',
        transclude: true,
        replace: false,
        scope: true,
        templateUrl: '../views/alertas.html'
    };
}]);



/* directivas de sobre los elementos */

expediente.directive('capitalize', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
                if (inputValue == undefined) inputValue = '';
                var capitalized = inputValue.toUpperCase();
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]);
        }
    };
});

expediente.directive('soloLetras', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]/g, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});