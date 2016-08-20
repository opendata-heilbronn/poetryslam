/**
 * Created by moritz on 20/08/16.
 */
(function () {
    'use strict';
    angular.module('psadmin').directive('soundPad', function (StorageService) {
        return {
            restrict: 'E',
            scope: true,
            template: '<audio controls id="media-audio"></audio>' +
                '<div layout="row" layout-wrap> <div ng-repeat="file in soundFileList"><div flex="33">'
            +'<md-button ng-class="{\'md-raised\':file.active == true}" ng-click="toggle($index)">{{soundFileList[$index].title}}</md-button>'
            +'</div></div></div><md-button ng-click="stop()"><md-icon md-svg-icon="av:stop"></md-icon></md-button>' +
            '<md-progress-linear id="progress-bar" md-mode="determinate" value="{{determinateValue}}"></md-progress-linear>',
            link: function (scope) {
                var mediaPlayer;
                    mediaPlayer = document.getElementById('media-audio');
                    mediaPlayer.controls = false;
                scope.soundFileList = [];
                var i;

                scope.soundFileList.push({
                    'title': "oneasdfkjasdhfkljasdfhasdf1",
                    'src': "/modules/admin/testAudioFiles/TRUEFORCEYOU_TALKIN_TO_ME.mp3"
                },{
                    'title': "oasdfsadfne2",
                    'src': "/modules/admin/testAudioFiles/PaulKalkbrenner_BackToTheFuture_PT.3.mp3"
                },{
                    'title': "onasdfasdfsdfe3",
                    'src': "/modules/admin/testAudioFiles/PaulKalkbrenner_BackToTheFuture_PT.2.mp3"
                },{
                    'title': "onasdfsdfsdfasdfasdfe4",
                    'src': "/modules/admin/testAudioFiles/Wouldn't it be nice.MP3"
                },{
                    'title': "MAX-Vell",
                    'src': "/modules/admin/testAudioFiles/Max-Vell - Sky.mp3"
                },{
                    'title': "asdfsdf",
                    'src': "/modules/admin/testAudioFiles/Brennan Heart Presents 'WE R Yearmix 2013' Slam FM 192.mp3"
                },{
                    'title': "Hardstyle - THe Best ",
                    'src': "/modules/admin/testAudioFiles/MAKJ & Lil Jon - Let's Get Fucked Up (Zatox Hardstyle Bootleg).wav"
                });
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
            }
        }
    });
})();