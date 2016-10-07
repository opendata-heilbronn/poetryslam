(function () {
    'use strict';

    var fadeOut = function (audioElement) {
        var maxValue = audioElement.volume;
        var startValue = 1;
        var iterations = 3;
        var iterationCount = 0;

        return new Promise(function (resolve) {
            var intervalObj = setInterval(function () {
                iterationCount++;
                audioElement.volume = Math.max(0, Math.min(maxValue, startValue / iterations * (iterations - iterationCount)));
                if (iterationCount >= iterations) {
                    clearInterval(intervalObj);
                    resolve();
                }
            }, 1);
        })
    };

    var fadeIn = function (audioElement) {
        var targetValue = 1;
        var iterations = 3;
        var iterationCount = 0;

        return new Promise(function (resolve) {
            var intervalObj = setInterval(function () {
                iterationCount++;
                audioElement.volume = Math.min(targetValue, targetValue / iterations * iterationCount);
                if (iterationCount >= iterations) {
                    clearInterval(intervalObj);
                    resolve();
                }
            }, 1);
        })
    };

    angular.module('psadmin').directive('backgroundAudio', function (FileService) {
        return {
            restrict: 'E',
            scope: true,
            template: '<audio src="" style="display: none;"></audio>',
            link: function (scope, element) {
                var audioElement = element[0].querySelector('audio');
                var currentSound = null;
                var currentPromise = Promise.resolve(true);
                var canPlayThrough = false;

                audioElement.oncanplaythrough = function () {
                    canPlayThrough = true;
                };

                var stop = function () {
                    if (currentSound === null) return Promise.resolve(true);
                    currentSound = null;
                    if (!audioElement.paused) {
                        return fadeOut(audioElement).then(function () {
                            audioElement.pause();
                            audioElement.src = "";
                        });
                    } else {
                        return Promise.resolve(true);
                    }
                };

                var updateSrc = function (sound) {
                    console.log('update audio src');
                    return FileService.getObjectUrl(sound.id).then(function (objectUrl) {
                        if (!objectUrl) return true;

                        currentSound = sound;
                        audioElement.currentTime = 0;
                        canPlayThrough = false;
                        audioElement.src = objectUrl;
                        audioElement.load();

                        return new Promise(function (resolve, reject) {
                            console.log('detect can play');
                            var iterationCount = 0;
                            var canPlayIntervalObj = setInterval(function () {
                                iterationCount++;
                                if (canPlayThrough) {
                                    console.log('can play');
                                    resolve();
                                    clearInterval(canPlayIntervalObj);
                                }
                                else if (iterationCount > 500) {
                                    reject();
                                    clearInterval(canPlayIntervalObj);
                                }
                            }, 10);
                        });
                    });
                };

                scope.$root.$on('sound.change', function () {
                    var sound = scope.$root.event.sound;
                    if (sound == currentSound) return true;
                    console.log('try to change sound');
                    currentPromise = stop().then(function () {
                        console.log('onchange: stopped audio');
                        if (!sound) return true;
                        return updateSrc(sound);
                    });
                });

                scope.$root.$on('sound.play', function () {
                    console.log('try to play audio');
                    currentPromise.then(function () {
                        if (!currentSound) return false;
                        console.log('play audio');
                        audioElement.volume = 0;
                        audioElement.play();
                        fadeIn(audioElement);
                    })
                });

                scope.$root.$on('sound.pause', function () {
                    fadeOut(audioElement).then(function () {
                        audioElement.pause();
                    })
                });
            }
        }
    });
})();