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
                scope.audiomode = {};
                scope.audiomode.playing = false;
                scope.audiomode.symbol = "play_arrow";
                scope.audiomode.time = 0;
                scope.audiomode.lastIndex = 31000;

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
                        mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
                    }

                    return mediaPlayer;
                };
                var updateProgressBar = function () {
                    scope.determinateValue = Math.floor((100 / mediaPlayer.duration) *
                        mediaPlayer.currentTime);
                    scope.$apply();
                };
                scope.playSound = function (event, sound, index) {
                    if (scope.audiomode.playing == true && index == scope.audiomode.lastIndex) {
                        scope.audiomode.playing = false;
                        scope.audiomode.symbol = "play_arrow";
                        scope.audiomode.time = scope.element.currentTime;
                        // scope.audiomode.time = scope.element.currentTime;
                        scope.element.volume = 0;
                        setTimeout(function () {
                            scope.element.pause();
                        },2);

                    } else {
                        scope.audiomode.symbol = "pause";
                        scope.audiomode.playing = true;
                        if(index == scope.audiomode.lastIndex){
                            playWithFadeIn(scope.audiomode.time);
                        }else {
                            scope.audiomode.lastIndex = index;
                            scope.element = getAudioElement();
                            scope.selectedAudio = sound;
                            FileService.getObjectUrl(sound.id).then(function (objectUrl) {
                                scope.element.currentTime = 0;
                                scope.element.src = objectUrl;
                                playWithFadeIn(0);
                            });
                        }

                    }
                    function playWithFadeIn(timeToStart) {
                        scope.element.load();
                        scope.element.volume = 0.0;
                        var fadePoint = 99999;
                        //the duration (metadata) takes longer to load then the sound
                        scope.element.onloadedmetadata = function () {
                            fadePoint = scope.element.duration - 0.01;
                        };
                        try {
                            scope.element.currentTime = timeToStart;
                        }
                        catch(err) {
                            console.log(err);
                        }
                        scope.element.play();

                        var fadeAudioStart = setInterval(function () {

                            // Only fade if past the fade out point or not at zero already

                            if ((scope.element.currentTime <= 0.02+timeToStart) && (scope.element.volume !== 1.0)) {
                                //multip. for parabel fade

                                scope.element.volume = 1;
                            }
                            // When volume at zero stop all the intervalling
                            if (scope.element.volume === 1.0) {
                                clearInterval(fadeAudioStart);
                            }
                        }, 1);
                        // Set the point in playback that fadeout begins. This is for a 2 second fade out.
                        var detectCloseToEnd = setInterval(function () {
                            if(scope.element.currentTime >= (fadePoint - 1.1) || scope.element.volume == 0) {
                                var fadeAudioEnd = setInterval(function () {

                                    // Only fade if past the fade out point or not at zero already
                                    if ((scope.element.currentTime >= fadePoint) && (scope.element.volume != 0.0)) {
                                        scope.element.volume = 0;
                                        scope.audiomode.time = 0;
                                    }
                                    // When volume at zero stop all the intervalling
                                    if (scope.element.volume <= 0.0) {
                                        scope.audiomode.playing = false;
                                        scope.audiomode.symbol = "play_arrow";
                                        clearInterval(detectCloseToEnd);
                                        clearInterval(fadeAudioEnd);

                                    }
                                }, 1);
                            }
                        }, 1000);
                    }
                };
                scope.stopSound = function (event) {
                    var element = getAudioElement();
                    element.volume = 0;
                    scope.audiomode.symbol = "play_arrow";
                    setTimeout(function () {
                        element.pause();
                    },1);
                };
            }
        };
    });
})();
