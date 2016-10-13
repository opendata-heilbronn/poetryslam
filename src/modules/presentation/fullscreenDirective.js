(function () {
    'use strict';
    angular.module('ps.presentation').directive('fullscreen', function () {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                    element.on("click", function() {
                            chrome.app.window.current().fullscreen()
                    });
            }
        };
    });
})();