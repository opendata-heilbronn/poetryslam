(function () {
        'use strict';
        angular.module('ps.presentation').directive('fullscreen', function ($mdDialog) {
                return {
                        restrict: 'A',
                        link: function (scope, element, attrs) {

                                var confirm = $mdDialog.confirm()
                                        .title('Vollbild')
                                        .textContent('Vollbildmodus anschalten.')
                                        .ok('Vollbild')
                                        .cancel('Fenstermodus');

                                $mdDialog.show(confirm).then(function () {
                                        chrome.app.window.current().fullscreen();
                                }, function () {
                                        
                                });
                        }
                };
        });
})();