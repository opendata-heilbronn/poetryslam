(function() {
    'use strict';
    angular.module('ps.presentation').directive('participant', function() {
        return {
            restrict: 'E',
            templateUrl: '/modules/presentation/partials/participant.html'
        };
    });
})();