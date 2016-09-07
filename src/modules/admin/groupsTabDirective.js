(function () {
    'use strict';
    angular.module('psadmin').directive('groupsTab', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: '/modules/admin/partials/groupsTab.html',
            controller: function($scope, $rootScope) {
              $scope.groupIsSelected = function(group) {
                if(group.id == $rootScope.event.view.groupId) {
                  return true;
                } else {
                  return false;
                }
              };
              $scope.selectGroup = function(group) {
                $rootScope.event.view.groupId = group.id;
              };
            }
        }
    });
})();
