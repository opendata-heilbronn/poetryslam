(function () {
    'use strict';

    angular.module('psadmin').controller('GroupParticipantsCtrl', function ($scope, group, groups, globalParticipants, DialogService, $q, $filter) {
        $scope.group = group;

        var filterParticipants = function (searchText) {
            return $q(function (resolve) {
                var searchFor = searchText ? searchText.toLowerCase() : "";
                var result = globalParticipants
                    .filter(function (participant) {
                        return participant.name.toLowerCase().indexOf(searchFor) != -1 || !searchFor;
                    })
                    .filter(function (participant) {
                        return groups.filter(function (group) {
                                return $filter('entryOfId')(participant.id, group.participants);
                            }).length <= 0;
                    });
                resolve(result);
            })
        };

        $scope.addParticipant = function () {
            DialogService.showGroupParticipantDialog(null, filterParticipants).then(function (data) {
                if (data.participant) {
                    $scope.group.participants.push({
                        id: data.participant.id
                    })
                }
            })
        };

        $scope.editParticipant = function (participant) {
        };

        $scope.deleteParticipant = function (participant) {
            $scope.group.participants.splice($scope.group.participants.indexOf(participant), 1);
        };

        $scope.addSacrifice = function () {
            DialogService.showParticipantDialog().then(function (sacrifice) {
                $scope.group.sacrifice = sacrifice;
            })
        };

        $scope.editSacrifice = function (sacrifice) {
            DialogService.showParticipantDialog(sacrifice).then(function (editedSacrifice) {
                angular.extend(sacrifice, editedSacrifice);
            })
        };

        $scope.deleteSacrifice = function () {
            $scope.group.sacrifice = null;
        };
    });
})();