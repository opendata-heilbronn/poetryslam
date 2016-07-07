/**
 * Created by moritz on 23/06/16.
 */

(function () {
    'use strict';
    angular.module('psadmin').directive('uploadLocalStorage', function (FileSaver, Blob, storageService) {
        return {
            restrict: 'E',
            scope: true,
            template: 'Upload: '+
            '<form name="form">' +
            '<button class="button" ngf-select ng-model="file" name="file">Select</button>' +
            '<button type="submit" ng-click="submit()">submit</button>'+
            '</form>' ,
            controller: function($scope){
                $scope.submit = function() {
                    var filereader = new FileReader();
                    filereader.onload = function (event) {
                        storageService.overrideEventFromLocalStorage(JSON.parse(event.target.result));
                    };
                    filereader.readAsText($scope.file);
                };
            }
        }
    });
})();