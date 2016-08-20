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
              scope.checkDelete = function(ev) {
                var confirm = $mdDialog.confirm()
                      .title('Wollen Sie den Eintrag wirklich Löschen?')
                      .textContent('Weg ist weg, das kommt nimmer wieder!')
                      .ariaLabel('Löschen')
                      .targetEvent(ev)
                      .ok('Löschen')
                      .cancel('Abbrechen');

                $mdDialog.show(confirm).then(function() {
                  if(typeof scope.list !== 'undefined') {
                    scope.list.splice(scope.list.indexOf(scope.entry), 1);
                  } else {
                    scope.entry = null;
                  }
                }, function() {});
              };
            }
        }
    });
})();
