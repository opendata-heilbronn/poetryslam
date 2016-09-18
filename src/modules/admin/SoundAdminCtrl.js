(function () {
    'use strict';
    angular.module('psadmin').controller('SoundAdminCtrl', function ($scope, FileService) {
        if (!Array.isArray($scope.event.sounds)) $scope.event.sounds = [];

        $scope.addSounds = function () {
            FileService.askForFiles('audio/*', true).then(function (newSounds) {
                newSounds.forEach(function (video) {
                    $scope.event.sounds.push(video);
                })
            }).catch(function (error) {
                console.trace(error.stack);
            });
        };

        $scope.deleteSound = function (sound) {
            $scope.event.sounds.splice($scope.event.sounds.indexOf(sound), 1);
            FileService.remove(sound.id);
        };
    });
})();