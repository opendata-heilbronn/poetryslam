(function () {
    'use strict';
    angular.module('psadmin').directive('endTab', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: '/modules/admin/partials/endTab.html'
        }
    });
})();
