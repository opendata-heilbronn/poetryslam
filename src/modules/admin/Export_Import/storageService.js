(function () {
    'use strict';

    angular.module('psadmin').service('storageService', function () {
        this.getEventFromLocalStorage = function () {
            console.log(localStorage.getItem('event'));
            return localStorage.getItem('event');
        };
        return this;
    });
})();