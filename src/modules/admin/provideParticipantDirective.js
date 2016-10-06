(function () {
    'use strict';
    angular.module('psadmin').directive('provideParticipant', function (PresentationService) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                scope.$watch(attrs['provideParticipant'], function (participantId) {
                    const competition = scope.getCompetition();
                    scope.participant = PresentationService.findGroupParticipant(competition, participantId);
                })
            }
        }
    });
})();