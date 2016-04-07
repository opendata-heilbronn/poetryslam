(function () {
    'use strict';

    angular.module('ps.sync').service('SyncService', function ($rootScope) {
        this.updateScope = function () {
            var event = localStorage.getItem('event');
            if (event) {
                $rootScope.event = JSON.parse(event);
                $rootScope.$apply();
                console.log('updated scope');
            }
        };

        this.persistScope = function() {
            localStorage.setItem('event', JSON.stringify($rootScope.event));
            console.log('persisted scope');
        };

        return this;
    });
})();