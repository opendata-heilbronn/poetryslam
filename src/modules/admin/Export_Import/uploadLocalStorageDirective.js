//create UI Button to upload a file that overrides all of the content stored in localStorage
//TODO: handle wrong files, project should crash on pdf file and throw error msg

(function () {
    'use strict';
    angular.module('psadmin').directive('uploadLocalStorage', function (FileSaver, Blob, storageService) {
        return {
            restrict: 'E',
            scope: true,
            template:
            '<form name="form">' +
            '<md-button class="md-secondary md-raised" ngf-select ng-model="file" name="file">Datei auswählen</md-button>' +
            '<md-button class="md-secondary md-raised" type="submit" ng-click="submit()">Bestätigen</md-button>'+
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
