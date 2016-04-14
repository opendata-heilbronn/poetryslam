(function () {
    'use strict';
    angular.module('ps.presentation').directive('intro', function () {
        return {
            restrict: 'E',
            templateUrl: '/modules/presentation/partials/intro.html'
        };
    });
})();