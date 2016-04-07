(function () {
    'use strict';

    angular.module('ps.admin', ['ps.sync']);

    angular.module('ps.admin').run(function ($rootScope) {
        $rootScope.event = {
            participant: {}
        };
    });
})();