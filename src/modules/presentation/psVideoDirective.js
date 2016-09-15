(function () {
    'use strict';
    angular.module('ps.presentation').directive('ratingParticipant', function () {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {

                alert("test");

                var video = angular.element('<video style="background: red;" class="fullscreen-video" autoplay><source src="' + scope.$root.videoplayersrc + '" type="video/mp4"></video>');

                element.replace(video);
            }
        }
    });
})();