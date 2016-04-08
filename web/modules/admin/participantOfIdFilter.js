(function () {
    'use strict';

    angular.module('psadmin').filter('participantOfId', function ($rootScope, $filter) {
        return function (id) {
            return $filter('entryOfId')(id, $rootScope.event.participants);
        };
    });
})();