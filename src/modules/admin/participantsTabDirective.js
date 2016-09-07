(function () {
    'use strict';
    angular.module('psadmin').directive('participantsTab', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: '/modules/admin/partials/participantsTab.html'
        }
    });
})();
