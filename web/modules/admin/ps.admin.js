(function (angular) {
    'use strict';

    var psadmin = angular.module('psadmin', ['ngMaterial', 'ngRoute', 'ps.sync']);
    psadmin.config(function ($mdThemingProvider, $mdIconProvider) {
        $mdIconProvider
            .iconSet('navigation', '/material-icons/navigation-icons.svg', 24)
            .iconSet('social', '/material-icons/social-icons.svg', 24)
            .iconSet('action', '/material-icons/action-icons.svg', 24)
            .iconSet('image', '/material-icons/image-icons.svg', 24)
            .iconSet('communication', '/material-icons/communication-icons.svg', 24);
        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('grey');
    });

    psadmin.controller('ParticipantAssignCtrl', function ($scope, $rootScope, $q) {
        var event = $rootScope.event;
        $scope.searchText = "";


        $scope.filterParticipants = function (searchText) {
            console.log("searchText: " + searchText);
            var defer = $q.defer();

            var result = [];
            var searchFor = searchText.toLowerCase();
            event.participants.forEach(function (elem) {
                if (!elem.assigned && (elem.name.toLowerCase().indexOf(searchFor) != -1 || !searchFor)) {
                    result.push(elem);
                }
            });
            defer.resolve(result);
            return defer.promise;
        };

    });


    psadmin.controller('AdminCtrl', function ($scope, $rootScope, $mdDialog, $q) {
        var event = $scope.event;
        //event.competitions = [];
        //event.participants = [];
        $scope.promptCompetition = function (ev) {
            var competition = {}; // TODO init from parameter for editing
            $mdDialog.show({
                targetEvent: ev,
                templateUrl: '/modules/admin/partials/dialogs/competitionDialog.html',
                locals: {competition: competition},
                controller: function ($scope, $mdDialog, competition) {
                    $scope.competition = competition;
                    $scope.save = function () {
                        $mdDialog.hide();
                        if (!event.competitions) {
                            event.competitions = [];
                        }
                        event.competitions.push(competition);

                    }
                }
            });
        };
        $scope.deleteCompetition = function (ev, event, competition) {
            var index = event.competitions.indexOf(competition);
            event.competitions.splice(index, 1);
            if (competition.groups) {
                competition.groups.forEach(function (group) {
                    if (group.participants) {
                        group.participants.forEach(function (element) {
                            element.assigned = false;
                        });
                    }
                });
            }
        };
        $scope.promptGroup = function (ev, competition) {
            var group = {}; // TODO init from parameter for editing
            $mdDialog.show({
                targetEvent: ev,
                templateUrl: '/modules/admin/partials/dialogs/groupDialog.html',
                locals: {group: group},
                controller: function ($scope, $mdDialog, group) {
                    $scope.group = group;
                    $scope.save = function () {
                        $mdDialog.hide();
                        if (!competition.groups) {
                            competition.groups = [];
                        }
                        competition.groups.push(group);
                    }
                }
            });
        };
        $scope.deleteGroup = function (ev, competition, group) {
            var index = competition.groups.indexOf(group);
            competition.groups.splice(index, 1);
            if (group.participants) {
                group.participants.forEach(function (element) {
                    element.assigned = false;
                });
            }
        };

        $scope.promptParticipant = function (ev, group, knownParticipant) {
            var participant = knownParticipant ? angular.extend({}, knownParticipant) : {};
            $mdDialog.show({
                targetEvent: ev,
                templateUrl: '/modules/admin/partials/dialogs/participantDialog.html',
                locals: {participant: participant},
                controller: function ($scope, $mdDialog, participant) {
                    $scope.participant = participant;
                    $scope.save = function () {
                        $mdDialog.hide();
                        if (knownParticipant) {
                            angular.extend(knownParticipant, participant);
                        } else {
                            if (!group.participants) {
                                group.participants = [];
                            }
                            group.participants.push(participant);
                        }
                    }
                }
            });
        };
        $scope.deleteParticipant = function (ev, group, knownParticipant) {
            var index = group.participants.indexOf(knownParticipant);
            group.participants.splice(index, 1);
            knownParticipant.assigned = false;
        };

        $scope.promptSacrifice = function (ev, group) {
            var participant = group.sacrifice ? angular.extend({}, group.sacrifice) : {};
            $mdDialog.show({
                targetEvent: ev,
                templateUrl: '/modules/admin/partials/dialogs/participantDialog.html',
                locals: {participant: participant},
                controller: function ($scope, $mdDialog, participant) {
                    $scope.participant = participant;
                    $scope.save = function () {
                        $mdDialog.hide();
                        group.sacrifice = participant;
                    }
                }
            });
        };

        $scope.deleteSacrifice = function (group) {
            group.sacrifice = null;
        };

        $scope.assignParticipant = function (ev, group) {
            $mdDialog.show({
                targetEvent: ev,
                templateUrl: '/modules/admin/partials/dialogs/participantAssignDialog.html',
                controller: function ($scope, $mdDialog) {
                    $scope.save = function (participant) {
                        $mdDialog.hide();
                        if (!group.participants) {
                            group.participants = [];
                        }
                        group.participants.push(participant);
                        participant.assigned = true;
                    }
                }
            });
        };
    });
})(angular);