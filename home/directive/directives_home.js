expediente.directive('dirMenu', [function () {
    return {
        restrict: 'E',
        transclude: true,
        replace: false,
        scope: true,
        templateUrl: '../views/menu.html'
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