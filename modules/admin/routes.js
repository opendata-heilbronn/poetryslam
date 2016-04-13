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
                    },
                    newEntryFn: function (EntityUtils) {
                        return function () {
                            return {id: EntityUtils.getUid()}
                        }
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
                    },
                    newEntryFn: function (EntityUtils) {
                        return function () {
                            return {id: EntityUtils.getUid(), groups: []}
                        }
                    }
                }
            })
            .when('/competitions/:id/groups', {
                templateUrl: '/modules/admin/partials/competitionGroups.html',
                controller: 'SimpleListCtrl',
                resolve: {
                    entries: function ($rootScope, $route, $filter) {
                        var competition = $filter('entryOfId')($route.current.params.id, $rootScope.event.competitions);
                        return competition.groups;
                    },
                    dialogFn: function (DialogService) {
                        return DialogService.showGroupDialog;
                    },
                    newEntryFn: function ($rootScope, $route, $filter, EntityUtils) {
                        return function () {
                            var competition = $filter('entryOfId')($route.current.params.id, $rootScope.event.competitions);
                            var groupNumber = competition.groups ? competition.groups.length + 1 : 1;
                            return {id: EntityUtils.getUid(), name: "Gruppe " + groupNumber, participants: []};
                        }
                    }
                }
            })
            .when('/competitions/:competitionId/groups/:id', {
                templateUrl: '/modules/admin/partials/groupParticipants.html',
                controller: 'GroupParticipantsCtrl',
                resolve: {
                    group: function ($rootScope, $route, $filter) {
                        var competition = $filter('entryOfId')($route.current.params.competitionId, $rootScope.event.competitions);
                        return $filter('entryOfId')($route.current.params.id, competition.groups);
                    },
                    groups: function ($rootScope, $route, $filter) {
                        var competition = $filter('entryOfId')($route.current.params.competitionId, $rootScope.event.competitions);
                        return competition.groups;
                    },
                    globalParticipants: function ($rootScope) {
                        return $rootScope.event.participants;
                    }
                }
            })
            .when('/presentation', {
                templateUrl: '/modules/admin/partials/presentation.html',
                controller: 'PresentationCtrl',
                resolve: {
                    event: function ($rootScope) {
                        return $rootScope.event;
                    }
                }
            })
            .otherwise({
                redirectTo: '/participants'
            });

        $locationProvider.html5Mode(false);
    });
})();