(function () {
    'use strict';
    angular.module('psadmin').directive('sidenavEntry', function ($location) {
        return {
            restrict: 'E',
            scope: true,
            template: '<md-button class="text-left" href="admin.html#{{path}}" ng-class="{\'md-primary\': isActive()}">{{label}}</md-button>',
            link: function (scope, element, attrs) {
                scope.path = attrs.path;
                scope.label = attrs.label;
                scope.isActive = function () {
                    return $location.path().indexOf(scope.path) === 0;
                }
            }
        }
    });
})();