(function () {
    'use strict';
    angular.module('psadmin').directive('competitionTab', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: '/modules/admin/partials/competitionTab.html',
            controller: function($scope, $rootScope) {
              $scope.competitionIsSelected = function(competition) {
                if(competition.id == $rootScope.event.view.competitionId) {
                  return true;
                } else {
                  return false;
                }

                $rootScope.event.competitions.forEach(function(val, idx, array) {
                  if(competition.id == val.id) {
                    return true;
                  }
                });
                return false;
              };
              $scope.selectCompetition = function(competition) {
                $rootScope.event.view.competitionId = competition.id;
              };
            }
        }
    });
})();
