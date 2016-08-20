(function () {
    'use strict';

    angular.module('ps.sync').service('SyncService', function ($rootScope, StorageService) {
        this.updatePresentationScope = function () {
            return StorageService.getItem('presentation')
                .then(function (presentation) {
                    if (presentation) {
                        $rootScope.presentation = presentation;
                        console.log('updated presentation', $rootScope.presentation);
                    } else {
                        $rootScope.presentation = {};
                        console.log('initialized presentation');
                    }
                })
                .catch(function (e) {
                    console.trace(e.stack);
                    console.error('failed to get presentation from storage');
                });
        };

        this.updateEventScope = function () {
            return StorageService.getItem('event')
                .then(function (event) {
                    if (event) {
                        $rootScope.event = event;
                        console.log('updated event ', event);
                    } else {
                        $rootScope.event = {
                            participants: [],
                            competitions: [],
                            view: {}
                        };
                    }
                })
                .catch(function (e) {
                    console.trace(e.stack);
                    console.error('failed to get event from storage');
                });
        };

        this.persistScope = function (event) {
            if (event) {
                StorageService.setItem('event', event)
                    .then(function () {
                        console.log('persisted scope');
                    })
                    .catch(function (e) {
                        console.trace(e.stack);
                        console.error('failed to set event in storage');
                    });
            }
        };

        return this;
    });
})();