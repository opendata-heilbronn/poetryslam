(function () {
    'use strict';
    angular.module('psadmin').directive('mediaPanel', function ($mdDialog, PresentationService, FileService) {
        return {
            restrict: 'E',
            templateUrl: '/modules/admin/partials/mediaPanel.html',
            scope: true,
            link: function (scope) {
                scope.event = scope.$root.event;
                scope.setScreen = scope.$parent.setScreen;
                scope.selected = {};

                // Movies
                scope.playBgVideo = function (type) {
                    if (scope.event.bgVideos && scope.event.bgVideos[type]) {
                        scope.event.view.bgVideo = type;
                        PresentationService.updatePresentation(scope.event);
                    }
                };

                scope.playClip = function (video) {
                    scope.event.view.video = video.id;
                    scope.event.view.startVideoAt = Date.now();
                    PresentationService.updatePresentation(scope.event);
                };

                scope.stopClip = function () {
                    scope.event.view.video = null;
                    scope.event.view.startVideoAt = Date.now();
                    PresentationService.updatePresentation(scope.event);
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
                    FileService.getObjectUrl(sound.id).then(function(objectUrl) {
                        element.currentTime = 0;
                        element.src = objectUrl;
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
                    });
                };
                scope.stopSound = function (event) {
                    var element = getAudioElement();
                    element.pause();
                };
            }
        };
    });
})();
