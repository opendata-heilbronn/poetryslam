(function (angular) {
    'use strict';

    angular.module('ps.storage')
        .service('FileStorage', function ($q, $rootScope, StorageService) {
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

            var addFileToRootScope = function (file) {
                if ($rootScope.event && $rootScope.event.files == undefined) {
                    $rootScope.event.files = [];
                }

                $rootScope.event.files.push({
                    "id": file.id,
                    "name": file.file.name,
                    "url": file.objectUrl
                });
            };

            var list = [];
            const localStorageKey = "file-ids";

            this.get = function () {

                return $q(function (resolve, reject) {
                    resolve(list);
                });
            };
            this.getAllAudio = function () {
                var get = this.get;
                return $q(function (resolve, reject) {
                    get().then(function(res) {
                        var audioList = [];
                        var i;
                        for (i= 0; i < res.length; i++){
                            if(res[i].file.type.indexOf('audio') == 0){
                                audioList.push(res[i]);
                            }
                        }
                        resolve(audioList);
                    });
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
                            addFileToRootScope(file);
                            resolve(file);
                        });
                    });
                });
            };

            this.loadFromStorage = function () {
                return $q(function (resolve, reject) {
                    StorageService.getItem(localStorageKey).then(function (arr) {
                        var idList = [];
                        idList = idList.concat(arr);

                        idList.forEach(function (item, index, array) {
                            chrome.fileSystem.isRestorable(item, function (isRestorable) {
                                if (isRestorable) {
                                    chrome.fileSystem.restoreEntry(item, function (entry) {
                                        getCustomFileObject(entry).then(function (file) {
                                            list.push(file);
                                            addFileToRootScope(file);
                                        });
                                    });
                                }
                            });
                        });

                        resolve(list);
                    });
                });
            };

            this.loadFromStorage();
        });
})(angular);