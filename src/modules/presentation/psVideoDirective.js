(function () {
    'use strict';
    angular.module('ps.presentation').directive('video', function () {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {



                var file = attrs.file;
                var muted = attrs.muted == null ? true : attrs.muted;

                console.log(file);

                if (file) {
                    element[0].src = file;
                    element[0].muted = muted;
                    element[0].play();
                }
            }
        }
    });
})();
