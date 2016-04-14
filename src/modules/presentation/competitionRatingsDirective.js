(function () {
    'use strict';
    angular.module('ps.presentation').directive('competitionRatings', function () {
        return {
            restrict: 'E',
            templateUrl: '/modules/presentation/partials/competitionRatings.html',
            controller: function ($scope) {
                $scope.isWinnerRowVisible = function (index) {
                    var number = $scope.presentation.winnerList.length - index;
                    if ($scope.presentation.showWinnersInReverseOrder) {
                        number = index + 1;
                    }
                    return number <= $scope.presentation.winnersToShow;
                }
            }
        }
    });
})();