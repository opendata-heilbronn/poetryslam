(function () {
    'use strict';
    angular.module('psadmin').directive('mediaPanel', function (FileStorage) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/modules/admin/partials/mediaPanel.html',
            link: function (scope, element, attrs) {
                scope.videos = scope.$root.event.files.video;
                scope.audios = scope.$root.event.files.audio;

                scope.openFile = function () {
                    FileStorage.open().then(function (file) {
                        // $scope.files.push(file);
                    });
                };

                scope.openPreview = function (event, video) {
                    scope.selectedVideo = video;
                };
                scope.closePreview = function (event) {
                    scope.selectedVideo = null;
                };
            }
        }
    });
})();
