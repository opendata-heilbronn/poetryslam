(function () {
    'use strict';
    angular.module('psadmin').directive('groupsTab', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: '/modules/admin/partials/groupsTab.html'
        }
    });
})();
