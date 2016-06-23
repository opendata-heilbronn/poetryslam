/**
 * Created by moritz on 23/06/16.
 */

(function () {
    'use strict';
    angular.module('psadmin').directive('downloadLocalStorage', function (storageService) {
        return {
            restrict: 'E',
            scope: true,
            template: '<button ng-click="click()">Click me</button> Clicked {{clicked}} times',
            controller: function($scope){
                $scope.clicked = 0;
                $scope.click = function(){
                    storageService.getEventFromLocalStorage();
                }
            }
        }
    });
})();