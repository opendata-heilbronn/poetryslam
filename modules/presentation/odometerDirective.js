(function () {
    'use strict';
    angular.module('ps').directive('odometer', function ($timeout, $filter) {
        // modify Odometer to always show a fractional digit
        Odometer.prototype.getFractionalDigitCount = function () {
            return 1;
        };

        return {
            restrict: 'E',
            template: '<span><span class="odometer" ng-show="valueSet"></span><span ng-hide="valueSet" class="hide-instant">?</span></span>',
            link: function (scope, element, attrs) {
                scope.valueSet = false;

                var odometer = new Odometer({
                    el: element[0].querySelector('.odometer'),
                    duration: 10000,
                    format: '( ddd),d',
                    formatFunction: function (value) {
                        return $filter('number')(value, 1);
                    },
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