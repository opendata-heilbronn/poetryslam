(function () {
    'use strict';

    angular.module('psadmin').controller('PresentationCtrl', function ($scope, event, PresentationService, $timeout) {
        $scope.event = event;

        $scope.reset = function () {
            $scope.event.view = {video: 'pause'};
            $scope.updatePresentation();
        };

        $scope.resetGroup = function () {
            $scope.event.view.video = 'pause';
            $scope.updatePresentation();
            $scope.event.view.groupId = null;
            $scope.event.view.participantId = null;
            $scope.updatePresentation();
        };

        $scope.setScreen = function (screenName, phase) {
            $scope.event.view.screen = screenName;
            $scope.event.view.phase = phase;
            $scope.event.view.video = 'bg';
            $scope.updatePresentation();
        };

        $scope.setVideo = function (videoName) {
            $scope.event.view.video = videoName;
            $scope.updatePresentation();
        };

        $scope.getCompetition = function () {
            return PresentationService.getCompetition($scope.event, $scope.event.view.competitionId);
        };

        $scope.getGroup = function () {
            return PresentationService.getGroup($scope.getCompetition(), $scope.event.view.groupId);
        };

        $scope.getGroupParticipant = function () {
            return PresentationService.getGroupParticipant($scope.getGroup(), $scope.event.view.participantId);
        };

        $scope.getScores = function () {
            var scores = $scope.getGroupParticipant().scores;
            if (!scores) {
                scores = [];
                $scope.getGroupParticipant().scores = scores;
            }
            if (scores.length < $scope.getCompetition().jurors) {
                for (var i = scores.length + 1; i <= $scope.getCompetition().jurors; i++) {
                    scores.push({value: ''});
                }
            }
            if (scores.length > $scope.getCompetition().jurors) {
                scores = scores.slice(0, $scope.getCompetition().jurors - 1);
                $scope.getGroupParticipant().scores = scores;
            }
            return scores;
        };

        $scope.updatePresentation = function () {
            PresentationService.updatePresentation($scope.event);
        };
        $scope.updatePresentation();
    });
})();