(function () {
    'use strict';

    angular.module('ps.admin').service('storageService', function () {
        this.getEventFromLocalStorage = function () {
            return localStorage.getItem('event');
        };
        return this;
    });
})();