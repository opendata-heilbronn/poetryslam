(function () {
    'use strict';

    var currentVersion = '1.0';

    var getAppCacheStatus = function () {
        var appCache = window.applicationCache;

        switch (appCache.status) {
            case appCache.UNCACHED: // UNCACHED == 0
                return 'Fehler';
                break;
            case appCache.IDLE: // IDLE == 1
                return 'OK';
                break;
            case appCache.CHECKING: // CHECKING == 2
                return 'Prüfe ...';
                break;
            case appCache.DOWNLOADING: // DOWNLOADING == 3
                return 'Download läuft ...';
                break;
            case appCache.UPDATEREADY:  // UPDATEREADY == 4
                return 'Update verfügbar';
                break;
            case appCache.OBSOLETE: // OBSOLETE == 5
                return 'Veraltet';
                break;
            default:
                return 'Unbekannt';
                break;
        }
    };

    var offerReload = false;

    window.addEventListener('load', function (e) {
        window.applicationCache.addEventListener('updateready', function () {
            if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                // Browser downloaded a new app cache.
                // Swap it in and reload the page to get the new hotness.
                window.applicationCache.swapCache();
                offerReload = true;
            } else {
                // Manifest didn't changed. Nothing new to server.
            }
        }, false);
    }, false);

    angular.module('psadmin').controller('AboutCtrl', function ($scope, $interval) {
        $scope.appCache = {
            status: getAppCacheStatus(),
            version: currentVersion,
            offerReload: offerReload
        };

        $scope.reload = function () {
            window.location.reload();
        };

        $interval(function () {
            $scope.appCache.status = getAppCacheStatus();
            $scope.appCache.offerReload = offerReload;
        }, 5000);
    });
})();