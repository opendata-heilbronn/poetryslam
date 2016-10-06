(function () {
    'use strict';

    var toFloat = function (value) {
        //if you pass NaN in value, this function also returns NaN
        return Math.round(parseFloat(value) * 10) / 10;
    };

    angular.module('psadmin').service('PresentationService', function ($filter, StorageService, FileService, $q) {
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

        this.findGroupParticipant = function (competition, participantId) {
            if (!competition.groups) return null;
            var that = this;
            var result = null;
            competition.groups.forEach(function (group) {
                if (result != null) return true;
                result = that.getGroupParticipant(group, participantId);
            });
            return result;
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

        this.markIgnoredScores = function (scores, enableIgnoredScores) {
            if (!enableIgnoredScores) {
                scores.forEach(function (score) {
                    score.ignored = false;
                });
                return scores;
            }

            var lowest = 99999, highest = -99999;
            var counterForRealNumbers = 0;
            scores.forEach(function (score) {
                if (!isNaN(parseFloat(score.value))) {
                    counterForRealNumbers++;
                }
            });
            //exit if there are less than 4 values
            if (counterForRealNumbers < 4) {
                return;
            }
            scores.forEach(function (score) {
                if (!isNaN(parseFloat(score.value))) {
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
                    return Array.isArray(groupParticipant.scores) && groupParticipant.scores.length > 0 && groupParticipant.scores[0].value !== '';
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
            if (resultList[winners] && resultList[winners].secondTotalScore == resultList[winners - 1].secondTotalScore && resultList[winners].thirdTotalScore == resultList[winners - 1].thirdTotalScore) {
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
            updateShowIngoredScores(fixedWinnerList);
            updateShowIngoredScores(variableWinnerList);
            var resultList = fixedWinnerList.concat(variableWinnerList);
            updateShowIngoredScores(resultList);
            resultList = markWinners(resultList, competition.winners);
            return resultList;
        };

        var generateResultList = function (groupParticipants, event, competition, doMarkWinners) {
            var result = generateGroupResultList(groupParticipants, event);
            // highlight
            if (result.length <= 0) return result;
            if (doMarkWinners) {
                result.sort(sortByScore);
                updateShowIngoredScores(result);
                result = markWinners(result, competition.fixedWinnersPerGroup);
            }
            return result;
        };

        var updateWinnerProperties = function (competition) {
            competition.acrossGroupsWinners = competition.winners % competition.groups.length;
            competition.fixedWinnersPerGroup = (competition.winners - competition.acrossGroupsWinners) / competition.groups.length;
        };

        var updateGroupParticipant = function (cGroupParticipant, enableIgnoredScores) {
            if (Array.isArray(cGroupParticipant.scores)) {
                cGroupParticipant.scores.forEach(function (score) {
                    if (score.value) score.value = score.value.replace(/,/, '.');
                });
                if (cGroupParticipant.extraScore) {
                    cGroupParticipant.extraScore = cGroupParticipant.extraScore.replace(/,/, '.');
                }
                that.markIgnoredScores(cGroupParticipant.scores, enableIgnoredScores);
                cGroupParticipant.totalScore = that.sumScore(cGroupParticipant.scores);
                cGroupParticipant.secondTotalScore = that.sumScoreSecond(cGroupParticipant.scores);
                cGroupParticipant.thirdTotalScore = addExtraScore(cGroupParticipant.extraScore, cGroupParticipant.secondTotalScore);
            }
        };

        var generatePresentation = function (event, previousPresentation) {
            if (!event || !event.view) return $q.reject('no event');

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
                bgVideo: event.view.bgVideo,
                startVideoAt: event.view.startVideoAt,
                winnersToShow: event.view.winnersToShow,
                customText: event.view.customText,
                customTextSubline: event.view.customTextSubline
            };

            if (competition && Object.keys(competition).length > 0) {
                updateWinnerProperties(competition);
            }
            if (competition && competition.groups) {
                competition.groups.forEach(function (cGroup) {
                    if (cGroup.participants) {
                        cGroup.participants.forEach(function (cgParticipant) {
                            updateGroupParticipant(cgParticipant, event.view.enableIgnoredScores);
                        });
                    }
                    if (cGroup.sacrifice) {
                        updateGroupParticipant(cGroup.sacrifice, event.view.enableIgnoredScores);
                    }
                })
            }

            if (groupParticipant) {
                result.scores = groupParticipant.scores;
                result.totalScore = groupParticipant.totalScore;
                result.secondTotalScore = groupParticipant.secondTotalScore;
            }

            if (group.participants) {
                result.resultList = generateResultList(group.participants, event, competition, event.view.phase === 'winners');
            }

            if (competition && Object.keys(competition).length > 0) {
                result.winnerList = generateWinnerList(event, competition);
                result.showWinnersInReverseOrder = competition.acrossGroupsWinners ? true : false;
            }

            var promises = [];
            if (event.view.bgVideo && event.bgVideos && event.bgVideos[event.view.bgVideo]) {
                promises.push(FileService.getObjectUrl(event.bgVideos[event.view.bgVideo].id).then(function (objectUrl) {
                    result.bgVideoUrl = objectUrl;
                }));
            }
            if (event.view.video) {
                promises.push(FileService.getObjectUrl(event.view.video).then(function (objectUrl) {
                    result.videoUrl = objectUrl;
                }));
            }

            return $q.all(promises).then(function () {
                return result;
            })
        };

        var previousPresentation = {};
        this.updatePresentation = function (event) {
            return generatePresentation(event, previousPresentation).then(function (presentation) {
                if (presentation) {
                    StorageService.setItem('presentation', presentation)
                        .then(function () {
                            previousPresentation = presentation;
                            console.log('persisted presentation');
                        })
                        .catch(function (e) {
                            console.trace(e.stack);
                            console.error('failed to persist presentation');
                        });
                }
                return presentation;
            }).catch(function (e) {
                console.error('error updating presentation');
                console.trace(e.stack);
            });
        };

        this.generateWinnerList = generateWinnerList;
        this.generateResultList = generateResultList;

        return this;
    });
})();