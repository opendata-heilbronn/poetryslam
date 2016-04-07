(function () {
    'use strict';

    angular.module('ps.sync').service('SyncService', function ($rootScope) {
        this.updateScope = function () {
            var event = localStorage.getItem('event');
            if (event) {
                $rootScope.event = angular.fromJson(event);
                $rootScope.$apply();
                console.log('updated scope');
            }
        };

        this.persistScope = function () {
            if (!$rootScope.event) {
                $rootScope.event = {};
            }
            localStorage.setItem('event', angular.toJson($rootScope.event));
            console.log('persisted scope');
        };

        return this;
    });
})();