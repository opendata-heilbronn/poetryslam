(function () {
    'use strict';

    var toFloat = function (value) {
        return parseFloat(value.replace(/,/g, '.'));
    };

    angular.module('psadmin').service('PresentationService', function ($filter) {
        var that = this;
        this.getCompetition = function (event, id) {
            var result = $filter('entryOfId')(id, event.competitions);
            return result ? result : {};
        };

        this.getGroup = function (competition, id) {
            var result = $filter('entryOfId')(id, competition.groups);
            return result ? result : {};
        };

        this.getGroupParticipant = function (group, id) {
            var result = $filter('entryOfId')(id, group.participants);
            return result ? result : null;
        };

        this.getParticipant = function (event, id) {
            if (!id) return {};
            var result = $filter('entryOfId')(id, event.participants);
            return result ? result : null;
        };

        this.sumScore = function (scores) {
            var total = 0;
            scores.forEach(function (score) {
                if (score.value && !score.ignored) {
                    total += toFloat(score.value);
                }
            });
            return total;
        };

        this.markIgnoredScores = function (scores) {
            var lowest = 11, highest = -1;

            scores.forEach(function (score) {
                if (score !== '') {
                    var value = toFloat(score.value);
                    if (value < lowest) lowest = value;
                    else if (value > highest) highest = value;
                }
                score.ignored = false;
            });

            if (lowest < 11) {
                scores.filter(function (score) {
                    return toFloat(score.value) === lowest;
                })[0].ignored = true;
            }
            if (highest > -1) {
                scores.filter(function (score) {
                    return toFloat(score.value) === highest;
                })[0].ignored = true;
            }
        };

        var generateResultList = function (groupParticipants, event) {
            var result = groupParticipants
                .filter(function (groupParticipant) {
                    return groupParticipant.scores && groupParticipant.scores[0].value !== '';
                })
                .map(function (groupParticipant) {
                    var participant = that.getParticipant(event, groupParticipant.id);
                    return {
                        name: participant.name,
                        slam: participant.slam,
                        totalScore: groupParticipant.totalScore
                    };
                });
            if (result.length > 0) {
                result[result.length - 1].state = 'highlight';
            }
            return result;
        };

        var generatePresentation = function (event) {
            if (!event) return false;
            var competition = that.getCompetition(event, event.view.competitionId);
            var group = that.getGroup(competition, event.view.groupId);
            var participant = that.getParticipant(event, event.view.participantId);
            var groupParticipant = that.getGroupParticipant(group, event.view.participantId);
            var result = {
                competitonName: competition.name,
                participant: participant,
                screen: event.view.screen,
                phase: event.view.phase
            };

            if (groupParticipant) {
                result.scores = groupParticipant.scores;
                that.markIgnoredScores(result.scores);
                groupParticipant.totalScore = that.sumScore(result.scores);
                result.totalScore = groupParticipant.totalScore;
            }

            if (group.participants) {
                result.resultList = generateResultList(group.participants, event);
            }

            return result;
        };

        this.updatePresentation = function (event) {
            var presentation = generatePresentation(event);
            console.log(angular.toJson(presentation));
            if (presentation) {
                localStorage.setItem('presentation', angular.toJson(presentation));
                console.log('persisted presentation');
            }
        };

        return this;
    });
})();