(function (angular) {
    'use strict';

    var psadmin = angular.module('psadmin', ['ngMaterial', 'ngRoute', 'ng-sortable', 'ps.sync']);

    psadmin.config(function ($mdThemingProvider, $mdIconProvider) {
        $mdIconProvider
            .iconSet('navigation', '/material-icons/navigation-icons.svg', 24)
            .iconSet('social', '/material-icons/social-icons.svg', 24)
            .iconSet('content', '/material-icons/content-icons.svg', 24)
            .iconSet('action', '/material-icons/action-icons.svg', 24)
            .iconSet('image', '/material-icons/image-icons.svg', 24)
            .iconSet('communication', '/material-icons/communication-icons.svg', 24);
        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('grey');
    });

    psadmin.run(function ($rootScope, SyncService) {
        SyncService.updateEventScope();
    })
})(angular);