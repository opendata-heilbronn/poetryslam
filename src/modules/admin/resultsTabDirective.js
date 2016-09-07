(function () {
    'use strict';
    angular.module('psadmin').directive('resultsTab', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: '/modules/admin/partials/resultsTab.html'
        }
    });
})();
