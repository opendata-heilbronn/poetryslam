(function () {
    'use strict';

    angular.module('psadmin').controller('PresentationCtrl', function ($scope, event, PresentationService) {
        $scope.event = event;

        $scope.reset = function () {
            $scope.event.view = {video: 'pause'};
            $scope.updatePresentation();
        };

        $scope.resetGroup = function () {
            $scope.event.view.bgVideo = 'pause';
            $scope.updatePresentation();
            $scope.event.view.groupId = null;
            $scope.event.view.participantId = null;
            $scope.updatePresentation();
        };

        $scope.setScreen = function (screenName, phase) {
            $scope.event.view.screen = screenName;
            $scope.event.view.phase = phase;
            $scope.event.view.bgVideo = 'bg';
            $scope.updatePresentation();
        };

        $scope.showGroupWinners = function () {
            $scope.event.view.winnersToShow = 0;
            $scope.setScreen('groupRatings', 'winners');
        };

        $scope.showCompetitionWinners = function () {
            $scope.event.view.winnersToShow = 0;
            $scope.setScreen('competitionRatings');
        };

        $scope.increaseWinnerCount = function () {
            $scope.event.view.winnersToShow++;
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
            var groupParticipant = $scope.getGroupParticipant();
            if (!groupParticipant) {
                return [];
            }
            var scores = groupParticipant.scores;
            if (!scores) {
                scores = [];
                groupParticipant.scores = scores;
            }
            if (scores.length < $scope.getCompetition().jurors) {
                for (var i = scores.length + 1; i <= $scope.getCompetition().jurors; i++) {
                    scores.push({value: ''});
                }
            }
            if (scores.length > $scope.getCompetition().jurors) {
                scores = scores.slice(0, $scope.getCompetition().jurors - 1);
                groupParticipant.scores = scores;
            }
            return scores;
        };

        $scope.$watch('selectedTabIndex', function (tabIndex) {
            var competition = $scope.getCompetition();
            if (tabIndex === 4) {
                if (!competition) $scope.winnerList = [];
                else $scope.winnerList = PresentationService.generateWinnerList($scope.event, competition);
            }
            else if (tabIndex === 3) {
                var group = $scope.getGroup();
                if (!competition || !group) $scope.groupResultList = [];
                else $scope.groupResultList = PresentationService.generateResultList(group.participants, $scope.event, competition, true);
            }
        });

        $scope.updatePresentation = function () {
            PresentationService.updatePresentation($scope.event);
        };
        $scope.updatePresentation();
    });
})();