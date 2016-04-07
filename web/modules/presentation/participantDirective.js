(function() {
    'use strict';
    angular.module('ps.presentation').directive('participant', function() {
        return {
            restrict: 'E',
            templateUrl: '/modules/presentation/partials/participant.html',
            controller: function() {

                $("[flowtype]").flowtype({
                    minimum: 500,
                    maximum: 1200
                });

                window.setTimeout(function() {
                    document.querySelector(".to-overlay-subline")
                        .classList
                        .remove("overlay-highlight");
                    document.querySelector(".to-overlay-subline")
                        .classList
                        .add("overlay-subline");
                }, 5000);
            }
        };
    });
})();