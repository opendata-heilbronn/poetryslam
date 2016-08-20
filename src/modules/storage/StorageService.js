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

            var getCustomFileObject = function (entry) {
                return $q(function (resolve, reject) {
                    entry.file(function (file) {

                        var foobar = {
                            "file": file,
                            "entry": entry,
                            "id": chrome.fileSystem.retainEntry(entry),
                            "objectUrl": URL.createObjectURL(file)
                        };

                        resolve(foobar);
                    });
                });
            };

            var list = [];

            this.get = function () {
                return $q(function (resolve, reject) {
                    resolve(list);
                });
            };

            this.getDisplayPath = function (fileEntry, callback) {
                chrome.fileSystem.getDisplayPath(fileEntry, callback);
            };

            this.open = function () {
                return $q(function (resolve, reject) {
                    chrome.fileSystem.chooseEntry({
                        type: 'openFile',
                        acceptsAllTypes: true
                    }, function (entry) {
                        getCustomFileObject(entry).then(function (file) {
                            list.push(file);
                            resolve(file);
                        });
                    });
                });
            };

            this.loadFromStorage = function () {
                return $q(function (resolve, reject) {
                   var idList = [];

                    idList.forEach(function (item, index, array) {
                        chrome.fileSystem.isRestorable(item, function (isRestorable) {
                            if (isRestorable) {
                                chrome.fileSystem.restoreEntry(item, function (entry) {
                                    getCustomFileObject(entry).then(function (file) {
                                        list.push(file);
                                    });
                                });
                            }
                        });
                    });

                    resolve(list);
                });
            }
        });
})(angular);