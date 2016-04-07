(function () {
    'use strict';

    angular.module('ps.sync').run(function ($rootScope) {
        $rootScope.$watch('event', function () {
            localStorage.setItem('event', JSON.stringify($rootScope.event));
        }, true);
    });
})();