(function () {
    'use strict';

    angular.module('ps.sync').run(function ($rootScope) {
        window.addEventListener('storage', function () {
            var event = localStorage.getItem('event');
            if (event) {
                $rootScope.event = JSON.parse(event);
                $rootScope.$apply();
                console.log('updated scope');
            }
        });
    });
})();