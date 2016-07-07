(function () {
    'use strict';

    angular.module('psadmin').service('storageService', function () {
        this.getEventFromLocalStorage = function () {
            console.log(localStorage.getItem('event'));
            return localStorage.getItem('event');
        };
        this.overrideEventFromLocalStorage = function (jsonObject) {
            localStorage.setItem('event', JSON.stringify(jsonObject));
        };
        return this;
    });
})();