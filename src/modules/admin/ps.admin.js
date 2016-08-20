(function (angular) {
    'use strict';

    var psadmin = angular.module('psadmin', ['ngMaterial', 'ngRoute', 'ng-sortable', 'ps.sync', 'ps.storage', 'ngFileSaver', 'ngFileUpload']);

    psadmin.config(function ($mdThemingProvider, $mdIconProvider) {
        $mdIconProvider
            .iconSet('navigation', '/material-icons/navigation-icons.svg', 24)
            .iconSet('social', '/material-icons/social-icons.svg', 24)
            .iconSet('content', '/material-icons/content-icons.svg', 24)
            .iconSet('action', '/material-icons/action-icons.svg', 24)
            .iconSet('image', '/material-icons/image-icons.svg', 24)
            .iconSet('av', '/material-icons/av-icons.svg', 24)
            .iconSet('communication', '/material-icons/communication-icons.svg', 24)
            .iconSet('file', '/material-icons/file-icons.svg', 24);
        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('grey');
    });

    psadmin.config(function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    });

    psadmin.run(function ($rootScope, SyncService) {
        SyncService.updateEventScope();
    });
})(angular);
