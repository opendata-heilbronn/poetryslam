(function () {
    'use strict';
    angular.module('ps.presentation').directive('fullscreen', function ($mdDialog, env) {
        return {
            restrict: 'A',
            link: function () {
                if (env.runtime !== 'chrome' || (window.location.search && window.location.search.indexOf('embedded=1') >= 0)) return true;

                var confirm = $mdDialog.confirm()
                    .title('Vollbild')
                    .textContent('Vollbildmodus anschalten?')
                    .ok('Vollbild')
                    .cancel('Fenstermodus');

                $mdDialog.show(confirm).then(function () {
                    chrome.app.window.current().fullscreen();
                });
            }
        };
    });
})();