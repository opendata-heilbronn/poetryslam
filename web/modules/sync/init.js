(function () {
    'use strict';

    angular.module('ps.sync').run(function (SyncService) {
        SyncService.updateScope();
    });
})();