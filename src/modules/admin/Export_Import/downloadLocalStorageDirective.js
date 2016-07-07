//create UI Button to download all of the content stored in localStorage
(function () {
    'use strict';
    angular.module('psadmin').directive('downloadLocalStorage', function (FileSaver, Blob, storageService) {
        return {
            restrict: 'E',
            scope: true,
            template: '<button ng-click="click()">Download current Slam</button>',
            controller: function($scope){
                $scope.click = function(){
                    var data = new Blob([storageService.getEventFromLocalStorage()], { type: 'text/plain;charset=utf-8' });
                    FileSaver.saveAs(data, 'PoetryBackup.slam');
                }
            }
        }
    });
})();