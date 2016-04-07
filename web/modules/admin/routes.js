(function () {
    'use strict';

    angular.module('psadmin').config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/participants', {
                templateUrl: '/modules/admin/partials/participants.html',
                controller: 'AdminCtrl'
            })
            .when('/competitions', {
                templateUrl: '/modules/admin/partials/competitions.html',
                controller: 'AdminCtrl'
            })
            .otherwise({
                redirectTo: '/participants'
            });

        $locationProvider.html5Mode(false);
    });
})();