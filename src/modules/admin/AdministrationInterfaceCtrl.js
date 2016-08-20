/**
 * Created by moritz on 14/07/16.
 */
(function () {
    'use strict';

    angular.module('psadmin')
        .controller('AdministrationInterfaceCtrl', function ($scope, StorageService, FileStorage) {
            $scope.files = [];

            StorageService.getAll().then(function (values) {
                $scope.files = values;
            });

            $scope.openFile = function () {
                var file = FileStorage.openFile();
            };
        });
})();