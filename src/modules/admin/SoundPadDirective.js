/**
 * Created by moritz on 20/08/16.
 */
(function () {
    'use strict';
    angular.module('psadmin').directive('soundPad', function (StorageService, FileStorage) {
        return {
            restrict: 'E',
            scope: true,
            template: '<audio controls id="media-audio"></audio>' +
                '<div layout="row" layout-wrap> <div ng-repeat="file in soundFileList"><div flex="33">'
            +'<md-button ng-class="{\'md-raised\':file.active == true}" ng-click="toggle($index)">{{soundFileList[$index].title}}</md-button>'
            +'</div></div></div><md-button ng-click="stop()"><md-icon md-svg-icon="av:stop"></md-icon></md-button>' +
            '<md-progress-linear id="progress-bar" md-mode="determinate" value="{{determinateValue}}"></md-progress-linear>'+
            '<md-button ng-click="log()">sadfsadfsadf</md-button>',
            link: function (scope) {
                var mediaPlayer;
                    mediaPlayer = document.getElementById('media-audio');
                    mediaPlayer.controls = false;
                //link with rootscope object here
                scope.soundFileList = [];

                //strike this code when the root scope works
                FileStorage.getAllAudio().then(function (res) {
                    for (i= 0; i < res.length; i++){
                        scope.soundFileList.push({'src': res[i].objectUrl,'title':res[i].file.name});
                    }
                });

                var i;

                scope.toggle = function (index) {
                    var i;
                    for(i=0; i < scope.soundFileList.length ;i++){
                        scope.soundFileList[i].active = false;
                    }
                        mediaPlayer.currentTime = 0;
                        mediaPlayer.src = scope.soundFileList[index].src;
                        scope.soundFileList[index].active = true;
                        mediaPlayer.load();
                        mediaPlayer.play();
                };
                //md-mode="determinate" value="{{determinateValue}}"
                mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
                function updateProgressBar() {
                    var progressBar = document.getElementById('progress-bar');
                    var percentage = Math.floor((100 / mediaPlayer.duration) *
                        mediaPlayer.currentTime);
                    scope.determinateValue = percentage;
                    console.log(mediaPlayer.currentTime);
                    scope.$apply();
                    progressBar.value = percentage;
                    //progressBar.innerHTML = percentage + '% played';
                }
                scope.stop = function (){
                    mediaPlayer.pause();
                    mediaPlayer.currentTime = 0;
                };
                scope.log = function () {
                    //console.log(JSON.stringify(FileStorage.get()));
                    FileStorage.getAllAudio().then(function (res) {
                        console.log(JSON.stringify(res[0].file.name)+" #");
                    })
                }
            }
        }
    });
})();