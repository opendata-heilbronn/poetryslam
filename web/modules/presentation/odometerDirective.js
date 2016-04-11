(function () {
    'use strict';
    angular.module('ps').directive('odometer', function ($timeout) {
        return {
            restrict: 'E',
            template: '<span><span class="odometer" ng-show="valueSet"></span><span ng-hide="valueSet" class="hide-instant">?</span></span>',
            link: function (scope, element, attrs) {
                scope.valueSet = false;

                var odometer = new Odometer({
                    el: element[0].querySelector('.odometer'),
                    duration: 10000,
                    format: '( ddd),d',
                    value: 0
                });

                var updateDelay = attrs.delay || 1000;
                scope.$watch(attrs.value, function (newValue) {
                    $timeout(function () {
                        scope.valueSet = true;
                        odometer.update(newValue);
                    }, updateDelay);
                });
            }
        }
    });
})();