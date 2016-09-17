(function () {
    'use strict';
    angular.module('psadmin').directive('video', function ($mdDialog) {
        return {
            restrict: 'E',
            scope: {
                file: '='
            },
            templateUrl: '/modules/admin/partials/deleteButton.html',
            link: function (scope, element, attrs) {

                if (scope.file && scope.file.$objectUrl) {
                    element[0].src = scope.file.$objectUrl;
                    element[0].muted = true;
                    element[0].play();
                }
            }
        }
    });
})();
