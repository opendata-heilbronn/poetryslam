(function() {
    'use strict';
    angular.module('ps.presentation').directive('groupRatings', function() {
        return {
            restrict: 'E',
            templateUrl: '/modules/presentation/partials/groupRatings.html',
            controller: function ($scope) {
                $scope.getOrderByField = function () {
                    return $scope.presentation.phase == 'winners' ? '-totalScore' : '';
                }
            }
        }
    });
})();