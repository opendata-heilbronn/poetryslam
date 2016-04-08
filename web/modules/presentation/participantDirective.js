(function() {
    'use strict';
    angular.module('ps.presentation').directive('participant', function() {
        return {
            restrict: 'E',
            templateUrl: '/modules/presentation/partials/participant.html',
            controller: function($rootScope) {

                $rootScope.$watch("event", function() {
                    console.log("event changed");

                    window.setTimeout(function() {
                        $("[max-lines]").each(function(index, elem) {
                            var content = $(elem).text();
                            $(elem).text("abc");
                            var maxHeight = $(elem).height();
                            $(elem).text(content);

                            if ($rootScope.event.phase == 'name') {
                                $(elem).removeClass("overlay-highlight")
                                    .addClass("overlay-highlight-long-text-phase-name");
                            } else {
                                $(elem).removeClass("overlay-highlight")
                                    .addClass("overlay-highlight-long-text-phase-rating");
                            }
                        });
                    }, 500);


                    window.setTimeout(function() {
                        $(".delay-5s").removeClass("delay-5s");
                    }, 10000);

                    window.setTimeout(function() {
                        if (document.querySelector(".to-overlay-subline") !== null &&
                            document.querySelector(".to-overlay-subline").classList !== null) {

                            document.querySelector(".to-overlay-subline")
                                .classList
                                .remove("overlay-highlight");
                            document.querySelector(".to-overlay-subline")
                                .classList
                                .add("overlay-subline");
                            document.querySelector(".to-overlay-subline")
                                .classList
                                .add("overlay-subline-with-margin-top");
                        }
                    }, 5000);
                });
            }
        };
    });
})();