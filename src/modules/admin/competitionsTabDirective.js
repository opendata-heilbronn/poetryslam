(function () {
    'use strict';
    angular.module('psadmin').directive('competitionsTab', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: '/modules/admin/partials/competitionsTab.html',
            controller: function($scope, $rootScope) {
              $scope.competitionIsSelected = function(competition) {
                if(competition.id == $rootScope.event.view.competitionId) {
                  return true;
                } else {
                  return false;
                }
              };
              $scope.selectCompetition = function(competition) {
                $rootScope.event.view.competitionId = competition.id;
                $rootScope.event.view.enableIgnoredScores = competition.enableIgnoredScores;
              };
            }
        }
    });
})();
