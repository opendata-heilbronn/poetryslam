(function (angular) {
    'use strict';

    angular.module('ps.storage')
        .service('FileStorage', function ($q, $rootScope, StorageService, Models) {
            var getStore = function () {
                return chrome.fileSystem;
            };

            var getCustomFileObject = function (entry, oldFile) {
                return $q(function (resolve, reject) {
                    entry.file(function (file) {

                        if (oldFile == undefined) {
                            oldFile = new Models.file(
                                chrome.fileSystem.retainEntry(entry),
                                file.name
                            );
                        }

                        oldFile.file = file;
                        oldFile.entry = entry;
                        oldFile.objectUrl = URL.createObjectURL(file);

                        resolve(oldFile);
                    });
                });
            };

            var filter = function (arr) {
                var result = {
                    "audios": [],
                    "videos": []
                };

                if (arr == null) {
                    return result;
                }

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].file.type.indexOf('audio') == 0) {
                        result.audios.push(arr[i]);
                    } else {
                        result.videos.push(arr[i]);
                    }
                }

                return result;
            };

            /**
             * Öffnet eine neue File mittels des FileExplorers
             */
            this.open = function () {
                return $q(function (resolve, reject) {
                    chrome.fileSystem.chooseEntry({
                        type: 'openFile',
                        acceptsAllTypes: true
                    }, function (entry) {
                        getCustomFileObject(entry).then(function (file) {
                            if ($rootScope.event == undefined) {
                                console.error("Event object not found in rootstate, creating.");
                                $rootScope.event = {};
                            }

                            if ($rootScope.event.files == undefined) {
                                console.warn("Object files not found in event-object, creating");
                                $rootScope.event.files = {
                                    audios: [],
                                    videos: []
                                };
                            }

                            var obj = filter([file]);
                            if (obj.audios.length > 0) {
                                $rootScope.event.files.audios.push(obj.audios[0])
                            }
                            if (obj.videos.length > 0) {
                                $rootScope.event.files.videos.push(obj.videos[0])
                            }

                            resolve();
                        });
                    });
                });
            };

            /**
             * Läd Files aus einer alten Session aus dem Eventobject neu
             */
            this.loadFromStorage = function () {
                return $q(function (resolve, reject) {
                    console.log("FileStorage: start loading files from storage");
                    var files = [];

                    if ($rootScope.event == undefined) {
                        console.error("FileStorage: Event object not found in rootstate, creating.");
                        $rootScope.event = {};
                    }

                    if ($rootScope.event.files == undefined) {
                        console.warn("FileStorage: Object files not found in event-object, creating");
                        $rootScope.event.files = {
                            audios: [],
                            videos: []
                        };
                    }

                    var files = $rootScope.event.files.audios.concat($rootScope.event.files.videos);
                    console.log("FileStorage: " + files.length + " files found in storage");

                    if (files.length == 0) {
                        resolve(filter([]));
                    }

                    var customFileObjects = [];
                    files.forEach(function (item, index, array) {
                        chrome.fileSystem.isRestorable(item.id, function (isRestorable) {
                            if (isRestorable) {
                                chrome.fileSystem.restoreEntry(item.id, function (entry) {
                                    item.entry = entry;

                                    getCustomFileObject(entry, item).then(function (file) {
                                        customFileObjects.push(file);

                                        if (index == array.length - 1) {
                                            var obj = filter(customFileObjects);
                                            $rootScope.event.files = obj;
                                            document.filesReady = true;
                                            resolve();
                                        }
                                    });
                                });
                            }
                        });
                    });

                });
            };
        });
})(angular);