(function () {
    'use strict';
    angular.module('psadmin').service('DialogService', function ($mdDialog) {
        var openDialog = function (templateUrl, data) {
            return new Promise(function (resolve) {
                $mdDialog.show({
                    templateUrl: templateUrl,
                    controller: function ($scope, $mdDialog) {
                        $scope.data = data;
                        $scope.save = function () {
                            $mdDialog.hide();
                            resolve(data);
                        }
                    }
                });
            })
        };

        var openSimpleEditDialog = function (templateUrl, entry) {
            entry = entry ? angular.copy(entry) : {};
            return openDialog(templateUrl, entry);
        };

        this.showParticipantDialog = function (participant) {
            return openSimpleEditDialog('/modules/admin/partials/dialogs/participantDialog.html', participant);
        };

        this.showCompetitionDialog = function (competition) {
            return openSimpleEditDialog('/modules/admin/partials/dialogs/competitionDialog.html', competition);
        };

        this.showGroupDialog = function (group) {
            return openSimpleEditDialog('/modules/admin/partials/dialogs/groupDialog.html', group);
        };

        this.showGroupParticipantDialog = function (groupParticipant, filterParticipantsFn) {
            groupParticipant = groupParticipant ? angular.copy(groupParticipant) : {};
            return openDialog('/modules/admin/partials/dialogs/groupParticipantDialog.html', {
                groupParticipant: groupParticipant,
                filterParticipantsFn: filterParticipantsFn
            });
        };

        return this;
    });
})();