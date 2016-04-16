(function () {
    'use strict';

    var toFloat = function (value) {
        return Math.round(parseFloat(value) * 10) / 10;
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
            if (!result && group.sacrifice && group.sacrifice.id == id) {
                result = group.sacrifice;
            }
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
            return Math.round(total * 10) / 10;
        };

        this.sumScoreSecond = function (scores) {
            var total = 0;
            scores.forEach(function (score) {
                if (score.value) {
                    total += toFloat(score.value);
                }
            });
            return Math.round(total * 10) / 10;
        };

        var setSingleScoreToIgnoredFailsafe = function (scores) {
            if (scores && scores[0]) {
                scores[0].ignored = true;
            }
        };

        this.markIgnoredScores = function (scores) {
            var lowest = 99999, highest = -99999;

            scores.forEach(function (score) {
                if (score !== '') {
                    var value = toFloat(score.value);
                    if (value < lowest) lowest = value;
                    if (value > highest) highest = value;
                }
                score.ignored = false;
            });

            if (lowest < 99999) {
                setSingleScoreToIgnoredFailsafe(scores.filter(function (score) {
                    return toFloat(score.value) === lowest;
                }));
            }

            if (highest > -99999) {
                setSingleScoreToIgnoredFailsafe(scores.filter(function (score) {
                    return toFloat(score.value) === highest && !score.ignored;
                }));
            }
        };

        var updateShowIngoredScores = function (resultList) {
            if (!resultList) return resultList;
            resultList.forEach(function (entry, index) {
                entry.showIgnoredScores = false;
                if (index > 0) {
                    if (resultList[index - 1].totalScore == entry.totalScore) {
                        resultList[index - 1].showIgnoredScores = true;
                        entry.showIgnoredScores = true;
                    }
                }
            });
        };

        var generateGroupResultList = function (groupParticipants, event) {
            if (!groupParticipants || !groupParticipants.length) return [];
            var result = groupParticipants
                .filter(function (groupParticipant) {
                    return groupParticipant.scores && groupParticipant.scores[0].value !== '';
                })
                .map(function (groupParticipant) {
                    var participant = that.getParticipant(event, groupParticipant.id);
                    return {
                        name: participant.name,
                        slam: participant.slam,
                        participantId: participant.id,
                        ignoredScores: groupParticipant.scores.filter(function (score) {
                            return score.ignored;
                        }),
                        totalScore: groupParticipant.totalScore,
                        secondTotalScore: groupParticipant.secondTotalScore,
                        thirdTotalScore: groupParticipant.thirdTotalScore,
                        extraScore: groupParticipant.extraScore
                    };
                });

            return result;
        };

        var markWinners = function (resultList, winners) {
            if (!winners || !resultList) return resultList;
            for (var winnerCount = 1; winnerCount <= winners; winnerCount++) {
                if (resultList[winnerCount - 1]) {
                    resultList[winnerCount - 1].state = 'highlight';
                }
            }
            // handle point equality
            if (resultList[winners] && resultList[winners].thirdTotalScore == resultList[winners - 1].thirdTotalScore) {
                var pointEquality = resultList[winners].thirdTotalScore;
                resultList
                    .filter(function (resultEntry) {
                        return resultEntry.thirdTotalScore == pointEquality;
                    })
                    .forEach(function (resultEntry) {
                        resultEntry.state = '';
                    })
            }
            return resultList;
        };

        var addExtraScore = function (extraScore, score) {
            if (!extraScore) return score;
            return toFloat(score) + toFloat(extraScore);
        };

        var sortByScore = function (a, b) {
            var result = b.totalScore - a.totalScore;
            if (result === 0) {
                result = b.secondTotalScore - a.secondTotalScore;
            }
            if (result === 0) {
                result = b.thirdTotalScore - a.thirdTotalScore;
            }
            return result;
        };

        var generateWinnerList = function (event, competition) {
            var fixedWinnerList = [];
            var variableWinnerList = [];
            if (competition.groups) {
                competition.groups.forEach(function (group) {
                    var groupResultList = generateGroupResultList(group.participants, event);
                    groupResultList.sort(sortByScore);
                    var fixedWinnersOfGroup = groupResultList.slice(0, competition.fixedWinnersPerGroup);
                    fixedWinnersOfGroup.forEach(function (resultEntry) {
                        resultEntry.slam = "Gewinner " + group.name;
                    });
                    fixedWinnerList = fixedWinnerList.concat(fixedWinnersOfGroup);
                    var variableWinnersOfGroup = groupResultList.slice(competition.fixedWinnersPerGroup, competition.acrossGroupsWinners + competition.fixedWinnersPerGroup);
                    variableWinnersOfGroup.forEach(function (resultEntry) {
                        resultEntry.slam = (groupResultList.indexOf(resultEntry) + 1) + ". Platz " + group.name;
                    });
                    variableWinnerList = variableWinnerList.concat(variableWinnersOfGroup);
                });
            }
            fixedWinnerList.sort(sortByScore);
            variableWinnerList.sort(sortByScore);
            var resultList = fixedWinnerList.concat(variableWinnerList);
            resultList = markWinners(resultList, competition.winners);
            updateShowIngoredScores(resultList);
            return resultList;
        };

        var generateResultList = function (groupParticipants, event, competition) {
            var result = generateGroupResultList(groupParticipants, event);
            // highlight
            if (result.length <= 0) return result;
            updateShowIngoredScores(result);
            if (event.view.phase === 'winners') {
                result.sort(sortByScore);
                result = markWinners(result, competition.fixedWinnersPerGroup);
            }
            return result;
        };

        var updateWinnerProperties = function (competition) {
            competition.acrossGroupsWinners = competition.winners % competition.groups.length;
            competition.fixedWinnersPerGroup = (competition.winners - competition.acrossGroupsWinners) / competition.groups.length;
        };

        var updateGroupParticipant = function (cGroupParticipant) {
            if (cGroupParticipant.scores) {
                cGroupParticipant.scores.forEach(function (score) {
                    if (score.value) score.value = score.value.replace(/,/, '.');
                });
                if (cGroupParticipant.extraScore) {
                    cGroupParticipant.extraScore = cGroupParticipant.extraScore.replace(/,/, '.');
                }
                that.markIgnoredScores(cGroupParticipant.scores);
                cGroupParticipant.totalScore = that.sumScore(cGroupParticipant.scores);
                cGroupParticipant.secondTotalScore = that.sumScoreSecond(cGroupParticipant.scores);
                cGroupParticipant.thirdTotalScore = addExtraScore(cGroupParticipant.extraScore, cGroupParticipant.secondTotalScore);
            }
        };

        var generatePresentation = function (event, previousPresentation) {
            if (!event || !event.view) return false;
            var competition = that.getCompetition(event, event.view.competitionId);
            var group = that.getGroup(competition, event.view.groupId);
            var participant = that.getParticipant(event, event.view.participantId);
            var groupParticipant = that.getGroupParticipant(group, event.view.participantId);
            if (competition && Object.keys(competition).length > 0) competition.winners = parseInt(competition.winners, 10);
            var result = {
                competitionName: competition.name,
                groupName: group.name,
                participant: participant,
                screen: event.view.screen,
                phase: event.view.phase,
                video: event.view.video,
                winnersToShow: event.view.winnersToShow,
                customText: event.view.customText,
                customTextSubline: event.view.customTextSubline
            };

            result.videoPlays = previousPresentation && previousPresentation.video != result.video ? true : false;

            if (competition && Object.keys(competition).length > 0) {
                updateWinnerProperties(competition);
            }
            if (competition && competition.groups) {
                competition.groups.forEach(function (cGroup) {
                    if (cGroup.participants) {
                        cGroup.participants.forEach(updateGroupParticipant);
                    }
                    if (cGroup.sacrifice) {
                        updateGroupParticipant(cGroup.sacrifice);
                    }
                })
            }

            if (groupParticipant) {
                result.scores = groupParticipant.scores;
                result.totalScore = groupParticipant.totalScore;
                result.secondTotalScore = groupParticipant.secondTotalScore;
            }

            if (group.participants) {
                result.resultList = generateResultList(group.participants, event, competition);
            }

            if (competition && Object.keys(competition).length > 0) {
                result.winnerList = generateWinnerList(event, competition);
                result.showWinnersInReverseOrder = competition.acrossGroupsWinners ? true : false;
            }

            return result;
        };

        var previousPresentation = {};
        this.updatePresentation = function (event) {
            var presentation = generatePresentation(event, previousPresentation);
            console.log(angular.toJson(presentation));
            if (presentation) {
                localStorage.setItem('presentation', angular.toJson(presentation));
                console.log('persisted presentation');
                previousPresentation = presentation;
            }
            return presentation;
        };

        return this;
    });
})();