(function () {
    'use strict';

    angular.module('psadmin').service('csvExportService', function ($rootScope, Blob, FileSaver) {
        this.exportCSV = function(competitionId) {
            var e = $rootScope.event;

            var competition = null;
            var matchingCompetitionKeys = Object.keys(e.competitions).filter(function (key) {
                return e.competitions[key].id == competitionId;
            });
            if (matchingCompetitionKeys && matchingCompetitionKeys.length === 1) {
                competition = e.competitions[matchingCompetitionKeys[0]];
            }
            if (competition === null) {
                return false;
            }

            var content = "";

            var append = function (value) {
                content += "\"" + value + "\";";
            };

            append("group");
            append("name");
            append("slam");
            for (var i = 1; i <= competition.jurors; i++) {
                append("score" + i);
            }
            append("ignoredScore1");
            append("ignoredScore2");
            append("extraScore");
            append("totalScore");
            append("totalScoreWithIgnoredScore");
            append("totalScoreWithIgnoredScoreAndExtraScore");
            content += "\n";

            competition.groups.forEach(function (group) {
                group.participants.forEach(function (participant) {
                    console.log(participant);
                    e.participants.forEach(function (p) {
                        if (p.id == participant.id) {
                            append(group.name);
                            append(p.name);
                            append(p.slam);
                            participant.scores.forEach(function (score) {
                                append(score.value);
                            });
                            participant.scores.forEach(function (score) {
                                if (score.ignored) {
                                    append(score.value);
                                }
                            });
                            append(participant.extraScore);
                            append(participant.totalScore);
                            append(participant.secondTotalScore);
                            append(participant.thirdTotalScore);
                            content += "\n";
                        }
                    })
                })
            });

            var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
            FileSaver.saveAs(blob, competition.name + "-scores.csv");
        };

        return this;
    });
})();
