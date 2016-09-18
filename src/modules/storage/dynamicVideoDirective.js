(function () {
    'use strict';
    angular.module('ps.storage').directive('dynamicVideo', function (FileService) {
        return {
            restrict: 'E',
            scope: {
                videoId: '='
            },
            replace: true,
            template: '<div><video></video></div>',
            link: function (scope, element) {
                var videoElement = element[0].querySelector('video');

                scope.$watch('videoId', function () {
                    if (scope.videoId === null || scope.videoId === undefined) {
                        videoElement.src = "";
                    }
                    else {
                        FileService.getObjectUrl(scope.videoId).then(function (url) {
                            videoElement.src = url;
                        }).catch(function (error) {
                            element[0].classList.add('error');
                            console.error('error resolving ' + scope.videoId, error);
                        });
                    }
                });

                var play = function () {
                    if (videoElement.ended) {
                        videoElement.currentTime = 0;
                    }
                    videoElement.play();
                };
                scope.$on('playVideo', play);
                scope.$on('playSpecificVideo', function (event, id) {
                    if (scope.videoId === id) play();
                });

                var replay = function () {
                    videoElement.currentTime = 0;
                    videoElement.play();
                };
                scope.$on('replayVideo', replay);
                scope.$on('replaySpecificVideo', function (event, id) {
                    if (scope.videoId === id) replay();
                });

                var pause = function () {
                    videoElement.pause();
                };
                scope.$on('pauseVideo', pause);
                scope.$on('pauseSpecificVideo', function (event, id) {
                    if (scope.videoId === id) pause();
                });

                var playPause = function () {
                    if (videoElement.paused) replay();
                    else pause();
                };
                scope.$on('playPauseVideo', playPause);
                scope.$on('playPauseSpecificVideo', function (event, id) {
                    if (scope.videoId === id) playPause();
                });
            }
        }
    });
})();
