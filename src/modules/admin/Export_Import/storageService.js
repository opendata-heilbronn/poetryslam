//service to save and load stuff to/from localStorgae
(function () {
    'use strict';

    angular.module('psadmin').service('storageService', function () {
        //load all
        this.getEventFromLocalStorage = function () {
            return localStorage.getItem('event');
        };
        //upload or save with override

        this.overrideEventFromLocalStorage = function (jsonObject) {
            localStorage.setItem('event', JSON.stringify(jsonObject));
        };
        return this;
    });
})();