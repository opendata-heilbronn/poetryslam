//create UI Button to upload a file that overrides all of the content stored in localStorage
//TODO: handle wrong files, project should crash on pdf file and throw error msg

(function () {
    'use strict';
    angular.module('psadmin').directive('resetLocalStorage', function (FileSaver, Blob, $mdDialog, StorageService) {
        return {
            restrict: 'E',
            scope: true,
            template: '<form name="form">' +
            '{{message}}' +
            '<md-button class="md-secondary md-raised" type="submit" ng-click="reset()">Daten zurücksetzen (Vorsicht!)</md-button>' +
            '</form>',
            controller: function ($scope) {
                $scope.reset = function (ev) {
                    var confirm = $mdDialog.confirm()
                        .title('Wollen Sie wirklich alle Daten zurücksetzen?')
                        .targetEvent(ev)
                        .ok('Zurücksetzen')
                        .cancel('Abbrechen');

                    $mdDialog.show(confirm).then(function () {
                        StorageService.clear()
                            .then(function () {
                                $scope.message = "Daten zurückgesetzt.";
                                window.location.reload();
                            })
                            .catch(function (err) {
                                $scope.message = "Fehler beim zurücksetzen.";
                                console.error(err);
                            });
                    }, function () {
                    });
                };
            }
        }
    });
})();
