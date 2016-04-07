(function() {
    'use strict';
    angular.module('ps.presentation').directive('participant', function() {
        return {
            restrict: 'E',
            templateUrl: '/modules/presentation/partials/participant.html',
            link: function() {
                window.setTimeout(function() {
                    $(".fitInside").each(function(index, elem) {
                        var content = $(elem).text();
                        $(elem).text("abc");
                        var maxHeight = $(elem).height();
                        $(elem).text(content);

                        while ($(elem).height() > maxHeight - 20) {
                            $(elem).css(
                                "font-size",
                                (parseInt($(".fitInside").css("font-size").replace("px", ""), 10) - 2) + "px");
                        }
                    });
                }, 1000);


                window.setTimeout(function() {
                    $(".delay-5s").removeClass("delay-5s");
                }, 10000);

                window.setTimeout(function() {
                    if (document.querySelector(".to-overlay-subline").classList !== null) {
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
            }

        };
    });
})();