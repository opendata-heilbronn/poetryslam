(function() {
    'use strict';
    angular.module('ps.presentation').directive('groupRatings', function() {
        return {
            restrict: 'E',
            templateUrl: '/modules/presentation/partials/groupRatings.html',
            controller: function($rootScope, $scope) {
                $scope.participants = [];

                $scope.next = function() {
                    $scope.participants.push(
                        $rootScope.event.participants[
                        $scope.participants.length
                        ]
                    );

                    if ($scope.participants.length < $rootScope.event.participants.length) {
                        window.setTimeout($scope.next, 1000);
                        $scope.$apply();
                    }
                };

                window.setTimeout($scope.next, 500);
            }
        };
    });
})();