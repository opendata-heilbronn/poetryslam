//create UI Button to download all of the content stored in localStorage
(function () {
    'use strict';
    angular.module('psadmin').directive('downloadLocalStorage', function (FileSaver, Blob, StorageService) {
        return {
            restrict: 'E',
            scope: true,
            template: '<md-button class="md-secondary md-raised" ng-click="click()">Aktuelle Veranstaltung herunterladen</md-button>',
            controller: function ($scope) {
                $scope.click = function () {
                    StorageService.getItem('event').then(function (event) {
                        event = JSON.stringify(event);
                        var data = new Blob([event], {type: 'text/plain;charset=utf-8'});
                        FileSaver.saveAs(data, 'PoetryBackup.slam');
                    })
                }
            }
        }
    });
})();
