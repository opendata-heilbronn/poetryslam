(function () {
    'use strict';

    /**
     * @namespace ps.storage
     */

    angular.module('ps.storage', [])
        .constant('env', {
            runtime: (window.chrome && chrome.runtime && chrome.runtime.id) ? 'chrome' : 'web'
        })
})();