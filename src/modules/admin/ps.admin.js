(function (angular) {
    'use strict';

    var psadmin = angular.module('psadmin', ['ngMaterial', 'ngRoute', 'ngMessages', 'ng-sortable', 'ps.sync', 'ps.storage', 'ngFileSaver', 'ngFileUpload']);

    psadmin.config(function ($mdThemingProvider, $mdIconProvider) {
        $mdIconProvider
            .iconSet('navigation', '/material-icons/navigation-icons.svg', 24)
            .iconSet('social', '/material-icons/social-icons.svg', 24)
            .iconSet('content', '/material-icons/content-icons.svg', 24)
            .iconSet('action', '/material-icons/action-icons.svg', 24)
            .iconSet('image', '/material-icons/image-icons.svg', 24)
            .iconSet('av', '/material-icons/av-icons.svg', 24)
            .iconSet('communication', '/material-icons/communication-icons.svg', 24)
            .iconSet('file', '/material-icons/file-icons.svg', 24)
            .iconSet('action', '/material-icons/action-icons.svg', 24)
            .iconSet('editor', '/material-icons/editor-icons.svg', 24);

        $mdThemingProvider.definePalette('mcgpalette0', {
            '50': '#858585',
            '100': '#5e5e5e',
            '200': '#424242',
            '300': '#1f1f1f',
            '400': '#0f0f0f',
            '500': '#000000',
            '600': '#000000',
            '700': '#000000',
            '800': '#000000',
            '900': '#000000',
            'A100': '#858585',
            'A200': '#5e5e5e',
            'A400': '#0f0f0f',
            'A700': '#000000',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 A100'
        });

        $mdThemingProvider.definePalette('mcgpalette1', {
            '50': '#ffffff',
            '100': '#ffffff',
            '200': '#f4f4f4',
            '300': '#d1d1d1',
            '400': '#c1c1c1',
            '500': '#b2b2b2',
            '600': '#a3a3a3',
            '700': '#939393',
            '800': '#848484',
            '900': '#757575',
            'A100': '#ffffff',
            'A200': '#ffffff',
            'A400': '#c1c1c1',
            'A700': '#939393',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 400 500 600 700 800 A100 A200 A400 A700'
        });

        $mdThemingProvider.theme('default')

            .primaryPalette('mcgpalette0')

            .accentPalette('mcgpalette1');
    });

    psadmin.config(function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    });

    psadmin.run(function ($rootScope, SyncService, FileStorage, FileService) {
        SyncService.updateEventScope().then(function () {
            console.log("START: loading files from storage");
            FileStorage.loadFromStorage();
            console.log("END: loading files from storage");
            if (!FileService.isRecoverable()) {
                $rootScope.event.videos = [];
                $rootScope.event.bgVideos = {};
            }
        });
    });
})(angular);
