(function () {
    'use strict';

    angular.module('psadmin').config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/participants', {
                templateUrl: '/modules/admin/partials/participants.html',
                controller: 'SimpleListCtrl',
                resolve: {
                    entries: function ($rootScope) {
                        return $rootScope.event.participants;
                    },
                    dialogFn: function (DialogService) {
                        return DialogService.showParticipantDialog;
                    }
                }
            })
            .when('/competitions', {
                templateUrl: '/modules/admin/partials/competitions.html',
                controller: 'SimpleListCtrl',
                resolve: {
                    entries: function ($rootScope) {
                        return $rootScope.event.competitions;
                    },
                    dialogFn: function (DialogService) {
                        return DialogService.showCompetitionDialog;
                    }
                }
            })
            .when('/presentation', {
                templateUrl: '/modules/admin/partials/presentation.html',
                controller: 'AdminCtrl'
            })
            .otherwise({
                redirectTo: '/participants'
            });

        $locationProvider.html5Mode(false);
    });
})();