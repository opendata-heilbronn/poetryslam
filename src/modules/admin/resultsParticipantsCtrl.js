(function () {
    'use strict';

    angular.module('psadmin').controller('resultsParticipantsCtrl', function ($scope, $rootScope) {
      $rootScope.event.participants.forEach(function(val, idx, array) {
        if(val.id == $scope.groupParticipant.id) {
          $scope.participant = val;
        }
      });
    });
})();
