(function () {
    'use strict';

    angular.module('psadmin').controller('SimpleListCtrl', function ($scope, entries, dialogFn, newEntryFn) {
        $scope.entries = entries;

        $scope.addEntry = function () {
            dialogFn(newEntryFn()).then(function (entry) {
                $scope.entries.push(entry);
            })
        };

        $scope.editEntry = function (entry) {
            dialogFn(entry).then(function (editedEntry) {
                angular.extend(entry, editedEntry);
            })
        };

        $scope.deleteEntry = function (entry) {
            $scope.entries.splice($scope.entries.indexOf(entry), 1);
        }
    });
})();