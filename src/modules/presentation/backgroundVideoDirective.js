(function () {
    'use strict';
    angular.module('ps.presentation').directive('backgroundVideo', function () {
        return {
            restrict: 'E',
            scope: {
                url: '='
            },
            template: '<div></div>',
            link: function (scope, element) {
                var currentUrl;
                var currentVideoElement;

                scope.$watch('url', function (url) {
                    console.log('recieved url: ' + url);
                    if (url && url !== currentUrl) {
                        // we have to do this to avoid flickering
                        var newVideoElement = document.createElement('video');
                        newVideoElement.classList.add('fullscreen-video');
                        newVideoElement.addEventListener('canplay', function () {
                            newVideoElement.play();
                            element[0].appendChild(newVideoElement);
                            if (currentVideoElement) {
                                element[0].removeChild(currentVideoElement);
                            }
                            currentUrl = url;
                            currentVideoElement = newVideoElement;
                        });
                        newVideoElement.src = url;
                        newVideoElement.load();
                    }
                });
            }
        }
    });
})();