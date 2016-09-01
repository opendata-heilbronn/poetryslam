(function () {
    'use strict';
    angular.module('psadmin').directive('mediaPanel', function (FileStorage) {
        return {
            restrict: 'E',
            scope: {
                readonly: "="
            },
            templateUrl: '/modules/admin/partials/mediaPanel.html',
            link: function (scope, element, attrs) {
                scope.event = scope.$root.event;

                scope.openFile = function () {
                    FileStorage.open().then(function (file) {
                        // $scope.files.push(file);
                    });
                };

                // Movies
                scope.openPreview = function (event, video) {
                    scope.selectedVideo = video;
                };
                scope.closePreview = function (event) {
                    scope.selectedVideo = null;
                };

                scope.deleteVideo = function (video) {
                    for (var i = scope.event.files.videos.length - 1; i >= 0; i--) {
                        if (scope.event.files.videos[i].id === video.id) {
                            scope.event.files.videos.splice(i, 1);
                            return;
                        }
                    }
                }

                // Sounds
                scope.playSound = function (event, sound) {

                };
            }
        };
    });
})();
