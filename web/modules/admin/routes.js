(function () {
    'use strict';

    angular.module('psadmin').config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/participants', {
                templateUrl: '/modules/admin/partials/participants.html',
                controller: 'AdminCtrl'
            })
            .when('/login', {
                templateUrl: 'login',
                controller: 'LoginCtrl'
            })
            .otherwise({
                redirectTo: '/participants'
            });

        $locationProvider.html5Mode(false);
    });
})();