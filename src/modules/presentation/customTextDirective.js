(function () {
    'use strict';
    angular.module('ps.presentation').directive('customText', function () {
        return {
            restrict: 'E',
            templateUrl: '/modules/presentation/partials/customText.html'
        };
    });
})();