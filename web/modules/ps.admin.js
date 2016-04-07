(function () {
    'use strict';

    angular.module('psadmin', ['ps.sync']);

    angular.module('psadmin').run(function ($rootScope) {
        $rootScope.event = {
            participant: {}
        };
    });
})();