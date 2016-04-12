(function () {
    'use strict';
    angular.module('ps.presentation').directive('ratingParticipant', function () {
        return {
            restrict: 'E',
            templateUrl: '/modules/presentation/partials/ratingParticipant.html'
        }
    });
})();