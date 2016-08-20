(function () {
    'use strict';
    angular.module('psadmin').directive('csvExport', function (csvExportService) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'modules/admin/partials/csvExport.html',
            controller: function($scope){
                $scope.export = function(id){
                    csvExportService.exportCSV(id);
                }
            }
        }
    });
})();
