/**
 * Created by moritz on 20/08/16.
 */
(function () {
    'use strict';
    angular.module('psadmin').directive('soundPad', function () {
        return {
            restrict: 'E',
            scope: true,
            template: '<audio controls id="media-audio"></audio>' +
            '<div layout="row" layout-wrap> <div ng-repeat="file in soundFileList track by $index"><div flex="33">'
            + '<md-button ng-class="{\'md-raised\':file.active == true}" ng-click="toggle($index)">{{soundFileList[$index].name}}</md-button>'
            + '</div></div></div><md-button ng-click="stop()"><md-icon md-svg-icon="av:stop"></md-icon></md-button>' +
            '<md-progress-linear id="progress-bar" md-mode="determinate" value="{{determinateValue}}"></md-progress-linear>',
            link: function (scope) {
                var mediaPlayer;
                mediaPlayer = document.getElementById('media-audio');
                //mediaPlayer.controls = true;
                console.log("TEST");
                scope.soundFileList = scope.$root.event.files.audio;
                //play or stop function
                scope.toggle = function (index) {
                    var i;
                    for (i = 0; i < scope.soundFileList.length; i++) {
                        scope.soundFileList[i].active = false;
                    }
                    mediaPlayer.currentTime = 0;
                    mediaPlayer.src = scope.soundFileList[index].url;
                    scope.soundFileList[index].active = true;
                    mediaPlayer.load();
                    mediaPlayer.play();
                };
                mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
                function updateProgressBar() {
                    scope.determinateValue = Math.floor((100 / mediaPlayer.duration) *
                        mediaPlayer.currentTime);
                    scope.$apply();
                }

                scope.stop = function () {
                    mediaPlayer.pause();
                    mediaPlayer.currentTime = 0;
                };
            }
        }
    });
})();