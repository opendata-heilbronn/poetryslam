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
                scope.playSound = function (sound) {
                    if(sound !== scope.event.sound) {
                        scope.event.sound = sound;
                        scope.$root.$emit('sound.change');
                    }
                    scope.event.soundState = 'play';
                    scope.$root.$emit('sound.play');
                };

                scope.pauseSound = function (sound) {
                    scope.event.soundState = 'pause';
                    scope.$root.$emit('sound.pause');
                };

                scope.stopSound = function () {
                    scope.event.sound = null;
                    scope.event.soundState = 'pause';
                    scope.$root.$emit('sound.change');
                };
            }
        };
    });
})();
