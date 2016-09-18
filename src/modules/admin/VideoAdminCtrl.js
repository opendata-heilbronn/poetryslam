(function () {
    'use strict';
    angular.module('psadmin').controller('VideoAdminCtrl', function ($scope, FileService, PresentationService) {
        if (!Array.isArray($scope.event.videos)) $scope.event.videos = [];
        if (!$scope.event.bgVideos) $scope.event.bgVideos = {};

        $scope.addVideos = function () {
            FileService.askForFiles('video/*', true).then(function (newVideos) {
                newVideos.forEach(function (video) {
                    $scope.event.videos.push(video);
                })
            }).catch(function (error) {
                console.trace(error.stack);
            });
        };

        $scope.selectBgVideo = function (name) {
            FileService.askForFiles('video/*', false).then(function (newVideos) {
                if (newVideos.length > 0) {
                    if ($scope.event.bgVideos[name]) FileService.remove($scope.event.bgVideos[name].id);
                    $scope.event.bgVideos[name] = newVideos[0];
                    if ($scope.event.view.bgVideo === name) {
                        PresentationService.updatePresentation($scope.event);
                    }
                }
            });
        };

        $scope.deleteVideo = function (video) {
            $scope.event.videos.splice($scope.event.videos.indexOf(video), 1);
            FileService.remove(video.id);
        };

        $scope.playPause = function (video) {
            $scope.$broadcast('playPauseSpecificVideo', video.id);
        };
    });
})();