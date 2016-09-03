(function (angular) {
    'use strict';

    /**
     * @namespace ps.storage.models
    */

    angular.module('ps.storage')
        .service('Models', function () {
            var models = {};

            /**
             * Represents a participant, a natural person
             * @constructor
             * @param {guid} id - Guid to idendifiy a participant
             * @param {string} name - name of the participant e.G. Marc Dieter Kling
             * @param {string} slam - slam where the participant came from
             * @param {string} gender - a character that indicates the gender (could be w or m or undefined)
             */
            models.participant = function (id, name, slam, gender) {
                /** {GUID}  */
                this.id = id;
                this.name = name;
                this.slam = slam;
                this.gender = gender;
            };

            /**
             * Represents a competition, normaly a competition represents a event e.G. Finlas or Pre-Finals
             * @constructor
             * @param {guid} id - Guid to idendifiy a competition
             * @param {string} name - name of the competition e.G. slam2016 Finale
             * @param {number} jurors - count of the jurors
             * @param {number} winners - 
             */
            models.competition = function (id, name, jurors, winners, acrossGroupsWinners, fixedWinnersPerGroup) {
                this.id = id;
                this.name = name;
                this.jurors = jurors;
                this.winners = winners;
                this.acrossGroupsWinners = acrossGroupsWinners;
                this.fixedWinnersPerGroup = fixedWinnersPerGroup;
            };

            models.group = function () {
                this.id = id;
                this.name = name;
                this.participants = participants;
                this.sacrifice = sacrifice;
            };

            models.file = function (id, name, file, entry, objectUrl) {
                this.name = name;
                this.file = file;
                this.entry = entry;
                this.id = id;
                this.objectUrl = objectUrl;
            }


            return models;
        });
})(angular);