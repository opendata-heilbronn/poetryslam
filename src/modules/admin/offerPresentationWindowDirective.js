(function () {
    'use strict';
    angular.module('psadmin').directive('offerPresentationWindow', function (env) {
        return {
            restrict: 'E',
            scope: true,
            template: '<md-button ng-if="isChrome" ng-click="open()">Präsentationsfenster öffnen</md-button>',
            link: function (scope) {
                scope.isChrome = env.runtime === 'chrome';

                scope.open = function () {
                    chrome.app.window.create('index.html', {
                        'state': 'maximized',
                        'id': 'presentation'
                    });
                };
            }
        }
    });
})();