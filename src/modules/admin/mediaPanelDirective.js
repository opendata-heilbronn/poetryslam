(function () {
    'use strict';
    angular.module('psadmin').directive('mediaPanel', function (FileStorage, $mdDialog, PresentationService) {
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
                scope.playVideo = function (event, video) {
                    scope.event.view.screen = "video";
                    scope.event.view.$videoplayersrc = video.$objectUrl;
                    PresentationService.updatePresentation(scope.event);
                };
                scope.deleteVideo = function (video) {
                    var alert = $mdDialog.confirm({
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
                    scope.event.view.background = video;
                    PresentationService.updatePresentation(scope.event);
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
                    element.src = scope.selectedAudio.$objectUrl;
                    element.load();
                    element.volume = 0.0;
                    var fadePoint = 0;
                    //the duration (metadata) takes longer to load then the sound
                    element.onloadedmetadata = function () {
                        fadePoint = element.duration - 2;
                    };
                    element.play();
                    var fadeAudioStart = setInterval(function () {

                        // Only fade if past the fade out point or not at zero already

                        if ((element.currentTime <= 2) && (element.volume !== 1.0)) {
                            //multip. for parabel fade
                            element.volume += 0.1 * element.currentTime;
                        }
                        // When volume at zero stop all the intervalling
                        if (element.volume === 1.0) {
                            clearInterval(fadeAudioStart);
                        }
                    }, 200);
                    // Set the point in playback that fadeout begins. This is for a 2 second fade out.
                    var fadeAudioEnd = setInterval(function () {

                        // Only fade if past the fade out point or not at zero already
                        if ((element.currentTime >= fadePoint) && (element.volume != 0.0)) {
                            element.volume -= 0.1 * (element.currentTime - fadePoint);
                        }
                        // When volume at zero stop all the intervalling
                        if (element.volume <= 0.0 && element.currentTime > fadePoint) {
                            console.log("clear interval  out");

                            clearInterval(fadeAudioEnd);
                        }
                    }, 200);
                };
                scope.stopSound = function (event) {
                    var element = getAudioElement();
                    element.pause();
                };
            }
        };
    });
})();
