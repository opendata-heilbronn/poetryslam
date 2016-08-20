(function () {
    'use strict';

    angular.module('ps', ['ps.sync', 'ps.storage', 'ps.presentation', 'ngAnimate']);

    angular.module('ps').run(function (SyncService, StorageService) {
        SyncService.updatePresentationScope();
        StorageService.onChange(SyncService.updatePresentationScope);
    });
})();