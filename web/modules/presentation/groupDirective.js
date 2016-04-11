(function () {
    'use strict';
    angular.module('ps.presentation').directive('group', function () {
        return {
            restrict: 'E',
            templateUrl: '/modules/presentation/partials/group.html'
        };
    });
})();