(function () {
    'use strict';
    angular.module('psadmin').directive('mediaPanel', function (FileStorage, $mdDialog) {
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

                    alert = $mdDialog.confirm({
                        title: 'Video löschen',
                        textContent: 'Wollen Sie das Video wirklich löschen?',
                        ok: 'Video löschen',
                        cancel: "abbrechen"
                    });
                    $mdDialog
                        .show(alert)
                        .then(function () {
                            for (var i = scope.event.files.videos.length - 1; i >= 0; i--) {
                                if (scope.event.files.videos[i].id === video.id) {
                                    scope.event.files.videos.splice(i, 1);
                                    return;
                                }
                            }
                        });
                };
                scope.setVideoAsBackground = function (video) {
                    for (var i = 0; i < scope.event.files.videos.length; i++) {
                        scope.event.files.videos[i].isBackground = false;
                    }

                    video.isBackground = true;
                };
                scope.setVideoAsPause = function (video) {
                    for (var i = 0; i < scope.event.files.videos.length; i++) {
                        scope.event.files.videos[i].isPause = false;
                    }

                    video.isPause = true;
                };

                // Sounds
                scope.selectedAudio = null;
                var mediaPlayer = null;
                var getAudioElement = function () {
                    if (mediaPlayer == null) {
                        mediaPlayer = document.getElementById("media-audio");
                        mediaPlayer.controls = true;
                        mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
                    }

                    return mediaPlayer;
                };
                var updateProgressBar = function () {
                    scope.determinateValue = Math.floor((100 / mediaPlayer.duration) *
                        mediaPlayer.currentTime);
                    scope.$apply();
                };

                scope.playSound = function (event, sound) {
                    var element = getAudioElement();
                    scope.selectedAudio = sound;

                    element.currentTime = 0;
                    element.src = scope.selectedAudio.objectUrl;
                    element.load();
                    element.play();
                };
                scope.stopSound = function (event) {
                    var element = getAudioElement();
                    element.pause();
                };
            }
        };
    });
})();
