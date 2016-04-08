(function () {
    'use strict';

    angular.module('ps', ['ps.sync', 'ps.presentation', 'ngAnimate']);

    angular.module('ps').run(function (SyncService) {
        SyncService.updatePresentationScope();
        window.addEventListener('storage', SyncService.updatePresentationScope);
    });
})();