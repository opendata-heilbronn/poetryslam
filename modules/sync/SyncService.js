(function () {
    'use strict';

    angular.module('ps.sync').service('SyncService', function ($rootScope) {
        this.updatePresentationScope = function () {
            var presentation = localStorage.getItem('presentation');
            if (presentation) {
                $rootScope.presentation = angular.fromJson(presentation);
                console.log('updated presentation');
            } else {
                $rootScope.presentation = {};
                console.log('initialized presentation');
            }
            $rootScope.$apply();
        };

        this.updateEventScope = function () {
            var event = localStorage.getItem('event');
            if (event) {
                $rootScope.event = angular.fromJson(event);
                console.log('updated event');
            } else {
                $rootScope.event = {
                    participants: [],
                    competitions: [],
                    view: {}
                };
                console.log('initialized event');
            }
            $rootScope.$apply();
        };

        this.persistScope = function (event) {
            if (event) {
                localStorage.setItem('event', angular.toJson(event));
                console.log('persisted scope');
            }
        };

        return this;
    });
})();