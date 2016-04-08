(function () {
    'use strict';

    angular.module('psadmin').controller('ParticipantsCtrl', function ($scope, DialogService) {
        $scope.participants = $scope.$root.event.participants;

        $scope.addParticipant = function () {
            DialogService.showParticipantDialog().then(function (participant) {
                $scope.participants.push(participant);
            })
        };

        $scope.editParticipant = function (participant) {
            DialogService.showParticipantDialog(participant).then(function (editedParticipant) {
                angular.extend(participant, editedParticipant);
            })
        };

        $scope.deleteParticipant = function (participant) {
            $scope.participants.splice($scope.participants.indexOf(participant), 1);
        }
    });
})();