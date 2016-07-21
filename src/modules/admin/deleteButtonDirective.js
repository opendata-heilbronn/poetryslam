(function () {
    'use strict';
    angular.module('psadmin').directive('deleteButton', function ($mdDialog) {
        return {
            restrict: 'E',
            scope: {
              list: '=',
              entry: '='
            },
            templateUrl: '/modules/admin/partials/deleteButton.html',
            link: function (scope, element, attrs) {
              scope.checkDelete = function() {
                $mdDialog.show({
                    templateUrl: '/modules/admin/partials/dialogs/deleteDialog.html',
                    controller: function ($scope, $mdDialog) {
                        $scope.delete = function () {
                          $mdDialog.hide();
                          if(typeof scope.list !== 'undefined') {
                            scope.list.splice(scope.list.indexOf(scope.entry), 1);
                          } else {
                            scope.entry = null;
                          }
                        };
                        $scope.cancel = function () {
                          $mdDialog.hide();
                        };
                    }
                });
              };
            }
        }
    });
})();
