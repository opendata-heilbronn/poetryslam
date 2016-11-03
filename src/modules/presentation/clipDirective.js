(function () {
    'use strict';
    angular.module('ps.presentation').directive('clip', function () {
        return {
            restrict: 'E',
            scope: {
                url: '=',
                startAt: '='
            },
            replace: true,
            template: '<div class="fullscreen-video fullscreen-clip" style="background: #000;display: none;"></div>',
            link: function (scope, element) {
                var currentUrl;
                var currentVideoElement;

                var destroy = function () {
                    element[0].removeChild(currentVideoElement);
                    currentVideoElement = null;
                    currentUrl = null;
                    element[0].style.display = 'none';
                };

                var update = function (url) {
                    console.log('recieved clip url: ' + url);
                    if ((!url || url !== currentUrl) && currentVideoElement) {
                        destroy();
                    }
                    if (url && url !== currentUrl) {
                        currentVideoElement = document.createElement('video');
                        currentVideoElement.classList.add('fullscreen-video');
                        if (window.location.search && window.location.search.indexOf('embedded=1') >= 0) {
                            currentVideoElement.muted = true;
                        }
                        currentVideoElement.addEventListener('canplay', function () {
                            element[0].style.display = 'block';
                            currentVideoElement.play();
                            element[0].appendChild(currentVideoElement);
                        });
                        currentVideoElement.addEventListener('ended', destroy);
                        currentVideoElement.src = url;
                        currentVideoElement.load();
                        currentUrl = url;
                    }
                };

                scope.$watch('startAt', function () {
                    update(scope.url);
                })
            }
        }
    });
})();