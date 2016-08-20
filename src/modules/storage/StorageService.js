(function (angular) {
    'use strict';

    angular.module('ps.storage')
        .constant('env', {
            runtime: (window.chrome && chrome.runtime && chrome.runtime.id) ? 'chrome' : 'web'
        })
        .service('StorageService', function (env, ChromeStorageService, LocalStorageService) {
            var storage = null;

            if (env.runtime == "chrome") {
                storage = ChromeStorageService;
            } else if (env.runtime == "web") {
                storage = LocalStorageService;
            } else {
                console.log("unkown storage type found. is not chrome or web. please add in StorageService.js");
                throw new Error("unkown storage type found. is not chrome or web. please add in StorageService.js");
            }

            return storage;
        })
        .service('ChromeStorageService', function ($q) {
            var getStore = function () {
                return chrome.storage.local;
            };


            this.getAll = function () {
                return $q(function (resolve) {
                    getStore().get(null, function (values) {
                        resolve(values);
                    });
                });
            };

            this.getItem = function (key) {
                return $q(function (resolve) {
                    getStore().get(key, function (value) {
                        resolve(value[key]);
                    });
                })
            };

            this.setItem = function (key, value) {
                return $q(function (resolve) {
                    var obj = {};
                    obj[key] = value;
                    getStore().set(obj, function () {
                        resolve();
                    });
                });
            };

            this.removeItem = function (key) {
                return $q(function (resolve) {
                    getStore().remove(key, function () {
                        resolve();
                    });
                });
            };

            this.clear = function () {
                return $q(function (resolve, reject) {
                    getStore().clear(function () {
                        // check if store is clear
                        getStore().get(function (result) {
                            if (Object.keys(result) > 0) {
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

            this.onChange = function (callback) {
                chrome.storage.onChanged.addListener(callback);
            };
        })
        .service('LocalStorageService', function ($window, $q) {
            this.getItem = function (key) {
                return $q(function (resolve) {
                    resolve(angular.fromJson($window.localStorage.getItem(key)));
                });
            };
            this.getAll = function () {
                return $q(function (resolve) {
                    var arrayToReturn = [];
                    for (var i = 0, len = localStorage.length; i < len; ++i) {
                        arrayToReturn.push(localStorage.getItem(localStorage.key(i)));
                    }
                    resolve(arrayToReturn);
                });
            };
            this.setItem = function (key, value) {
                return $q(function (resolve) {
                    console.log('setItem called');
                    $window.localStorage.setItem(key, angular.toJson(value));
                    resolve();
                });
            };

            this.removeItem = function (key) {
                return $q(function (resolve) {
                    $window.localStorage.removeItem(key);
                    resolve();
                });
            };

            this.clear = function () {
                return $q(function (resolve) {
                    $window.localStorage.clear();
                    resolve();
                });
            };

            this.onChange = function (callback) {
                $window.addEventListener('storage', callback);
            };
        })
        .service('FileStorage', function ($q) {
            var getStore = function () {
                return chrome.fileSystem;
            };

            this.openFile = function () {
                return $q(function (resolve, reject) {
                    chrome.fileSystem.chooseEntry({
                        type: 'openFile',
                        accepts: [{
                            description: 'Text files (*.txt)',
                            extensions: ['txt']
                        }],
                        acceptsAllTypes: true
                    }, function (file) {

                    });
                });
            }
        });
})(angular);