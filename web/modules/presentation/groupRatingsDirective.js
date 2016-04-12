(function () {
    'use strict';
    angular.module('ps.presentation').directive('groupRatings', function () {
        return {
            restrict: 'E',
            templateUrl: '/modules/presentation/partials/groupRatings.html',
            controller: function ($scope) {
                $scope.getRowDelay = function (index, list, phase) {
                    if (phase === 'winners') {
                        return ((list.length - index) * 2) + 2;
                    } else {
                        return (index * 0.5) + 2.5;
                    }
                };

                $scope.getSublineDelay = function (list, phase) {
                    if (phase === 'winners') {
                        return 2;
                    } else {
                        return (list.length * 0.5) + 3
                    }
                }
            }
        }
    });
})();