(function () {
    'use strict';
    angular.module('ps.presentation').directive('pause', function () {
        return {
            restrict: 'E',
            templateUrl: '/modules/presentation/partials/pause.html'
        }
    });
})();