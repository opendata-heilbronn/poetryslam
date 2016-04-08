(function () {
    'use strict';
    angular.module('psadmin').service('DialogService', function ($mdDialog) {
        var openSimpleEditDialog = function (templateUrl, entry) {
            entry = entry ? angular.copy(entry) : {};
            return new Promise(function (resolve) {
                $mdDialog.show({
                    templateUrl: templateUrl,
                    controller: function ($scope, $mdDialog) {
                        $scope.entry = entry;
                        $scope.save = function () {
                            $mdDialog.hide();
                            resolve(entry);
                        }
                    }
                });
            })
        };

        this.showParticipantDialog = function (participant) {
            return openSimpleEditDialog('/modules/admin/partials/dialogs/participantDialog.html', participant);
        };

        this.showCompetitionDialog = function (competition) {
            return openSimpleEditDialog('/modules/admin/partials/dialogs/competitionDialog.html', competition);
        };

        return this;
    });
})();