/**
 * Created by moritz on 20/08/16.
 */
(function () {
    'use strict';
    angular.module('psadmin').directive('soundPad', function (StorageService) {
        return {
            restrict: 'E',
            scope: true,
            template: '<audio controls id="media-audio"></audio><div ng-repeat="file in soundFileList"> <md-button ng-class="{\'md-raised\':file.active == true}" ng-click="toggle($index)">{{soundFileList[$index].title}}</md-button></div><md-button ng-click="stop()"><md-icon md-svg-icon="av:stop"></md-icon></md-button>',
            link: function (scope) {
                var mediaPlayer;
                    mediaPlayer = document.getElementById('media-audio');
                    mediaPlayer.controls = false;
                scope.soundFileList = [];
                var i;

                scope.soundFileList.push({
                    'title': "one1",
                    'src': "/modules/admin/testAudioFiles/TRUEFORCEYOU_TALKIN_TO_ME.mp3"
                },{
                    'title': "one2",
                    'src': "/modules/admin/testAudioFiles/PaulKalkbrenner_BackToTheFuture_PT.3.mp3"
                },{
                    'title': "one3",
                    'src': "/modules/admin/testAudioFiles/PaulKalkbrenner_BackToTheFuture_PT.2.mp3"
                },{
                    'title': "one4",
                    'src': "/modules/admin/testAudioFiles/Wouldn't it be nice.MP3"
                },{
                    'title': "MAX-Vell",
                    'src': "/modules/admin/testAudioFiles/Max-Vell - Sky.mp3"
                },{
                    'title': "asdfsdf",
                    'src': "/modules/admin/testAudioFiles/Brennan Heart Presents 'WE R Yearmix 2013' Slam FM 192.mp3"
                },{
                    'title': "Hardstyle",
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
                scope.stop = function (){
                    mediaPlayer.pause();
                    mediaPlayer.currentTime = 0;
                };
            }
        }
    });
})();