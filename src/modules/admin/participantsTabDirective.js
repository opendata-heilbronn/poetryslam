(function () {
    'use strict';
    angular.module('psadmin').directive('participantsTab', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: '/modules/admin/partials/participantsTab.html',
            controller: function($scope, $rootScope) {
              $scope.participantIsSelected = function(participant) {
                if(participant.id == $rootScope.event.view.participantId) {
                  return true;
                } else {
                  return false;
                }
              };
              $scope.selectParticipant = function(participant) {
                $rootScope.event.view.participantId = participant.id;
              };
            }
        }
    });
})();
