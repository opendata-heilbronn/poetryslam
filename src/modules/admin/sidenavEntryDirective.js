(function () {
    'use strict';
    angular.module('psadmin').directive('sidenavEntry', function ($location) {
        return {
            restrict: 'E',
            scope: true,
            template: '<md-button class="text-left" href="admin.html#{{path}}" ng-class="{\'md-primary\': isActive()}">{{getLabel()}}</md-button>',
            link: function (scope, element, attrs) {
                scope.path = scope.$eval(attrs.path);
                scope.getLabel = function () {
                    return scope.$eval(attrs.label);
                };
                scope.isActive = function () {
                    return $location.path() == scope.path;
                }
            }
        }
    });
})();