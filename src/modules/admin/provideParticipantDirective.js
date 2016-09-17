(function () {
    'use strict';
    angular.module('psadmin').directive('provideParticipant', function (PresentationService) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                scope.$watch(attrs['provideParticipant'], function (participantId) {
                    scope.participant = PresentationService.getGroupParticipant(scope.getGroup(), participantId);
                })
            }
        }
    });
})();