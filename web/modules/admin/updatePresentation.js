(function () {
    'use strict';

    angular.module('psadmin').run(function ($rootScope, SyncService) {
        $rootScope.$watch('event', function (event) {
            SyncService.persistScope(event);
        }, true);
    })
})();