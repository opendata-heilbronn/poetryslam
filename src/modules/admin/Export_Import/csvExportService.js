(function () {
    'use strict';

    /*
    group
    name
    slam
    score1
    score2
    scoreN
    ignoredScore1
    ignoredScore2
    extraScore
    totalScore
    totalScoreWithIgnoredScore
    totalScoreWithIgnoredScoreAndExtraScore
    */

    angular.module('psadmin').service('csvExportService', function (storageService, Blob, FileSaver) {
        this.exportCSV = function(competitionId) {
          var e = angular.fromJson(storageService.getEventFromLocalStorage());

          var competition = {};
          for(var element of e.competitions) {
            if(element.id == competitionId) {
              competition = element;
              break;
            }
          }
          if(competition == {}) {
            return;
          }

          var content = "";

          var append = function(value) {
            content += "\"" + value + "\";";
          }

          append("group");
          append("name");
          append("slam");
          for(var i = 1; i <= competition.jurors; i++) {
            append("score" + i);
          }
          append("ignoredScore1");
          append("ignoredScore2");
          append("extraScore");
          append("totalScore");
          append("totalScoreWithIgnoredScore");
          append("totalScoreWithIgnoredScoreAndExtraScore");
          content += "\n";

          for(var group of competition.groups) {
            for(var participant of group.participants) {
              console.log(participant);
              for(var p of e.participants) {
                if(p.id == participant.id) {
                  append(group.name);
                  append(p.name);
                  append(p.slam);
                  for(var score of participant.scores) {
                    append(score.value);
                  }
                  for(var score of participant.scores) {
                    if(score.ignored) {
                      append(score.value);
                    }
                  }
                  append(participant.extraScore);
                  append(participant.totalScore);
                  append(participant.secondTotalScore);
                  append(participant.thirdTotalScore);
                  content += "\n";
                }
              }
            }
          }

          var blob = new Blob([content], {type: "text/plain;charset=utf-8"})
          FileSaver.saveAs(blob, competition.name + "-scores.csv");
        };

        return this;
    });
})();
