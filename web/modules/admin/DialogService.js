(function () {
    'use strict';
    angular.module('psadmin').service('DialogService', function ($mdDialog) {
        this.showParticipantDialog = function (participant) {
            participant = participant ? angular.copy(participant) : {};
            return new Promise(function (resolve) {
                $mdDialog.show({
                    templateUrl: '/modules/admin/partials/dialogs/participantDialog.html',
                    controller: function ($scope, $mdDialog) {
                        $scope.participant = participant;
                        $scope.save = function () {
                            $mdDialog.hide();
                            resolve(participant);
                        }
                    }
                });
            })
        };

        return this;
    });
})();