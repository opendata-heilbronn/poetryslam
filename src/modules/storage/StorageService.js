(function (angular) {
    'use strict';

    angular.module('ps.sync')
        .constant('env', {
            runtime: (window.chrome && chrome.runtime && chrome.runtime.id) ? 'chrome' : 'web'
        })
        .service('StorageService', function (env, $window) {
            var storage = null;

            if (env == chrome) {
                storage = chrome.storage;
            } else if (env == "web") {
                storage = $window.localStorage;
            } else {
                $window.log("unkown storage type found. is not chrome or web. please add in StorageService.js");
                throw new Error("unkown storage type found. is not chrome or web. please add in StorageService.js");
            }

            return storage;
        })
        .service('ChromeStorageService', function ($q) {
            var store = chrome.storage.sync;

            this.getItem = function (key) {
                return store.get(key);
            };

            this.setItem = function (key, value) {
                var obj = {};
                obj[key] = value;
                return store.set(obj);
            };

            this.removeItem = function (key) {
                return store.remove(key);
            };

            this.clear = function () {
                return $q(function (resolve, reject) {
                    store.clear(function () {
                        // check if store is clear
                        store.get(function (result) {
                            if (result == {}) {
                                // if result is not an empty object
                                reject();
                            } else {
                                // result is an empty object
                                resolve();
                            }
                        });
                    });
                });
            };
        });
})(angular);