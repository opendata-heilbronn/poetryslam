(function () {
    'use strict';

    angular.module('ps.sync').run(function ($rootScope, SyncService) {
        $rootScope.$watch('event', SyncService.persistScope, true);
    });
})();