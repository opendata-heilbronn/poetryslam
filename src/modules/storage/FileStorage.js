(function (angular) {
    'use strict';

    angular.module('ps.storage')
        .service('FileStorage', function ($q, $rootScope, StorageService) {
            var getStore = function () {
                return chrome.fileSystem;
            };

            var getCustomFileObject = function (entry, oldFile) {
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

            var filter = function (arr) {
                var result = {
                    "audio": [],
                    "video": []
                };

                if (arr == null) {
                    return result;
                }

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].file.type.indexOf('audio') == 0) {
                        result.audio.push(arr[i]);
                    } else {
                        result.audio.push(arr[i]);
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
                                    audio: [],
                                    video: []
                                };
                            }

                            var obj = filter([file]);
                            if (obj.audio.length > 0) {
                                $rootScope.event.files.audio.push(obj.audio[0])
                            }
                            if (obj.video.length > 0) {
                                $rootScope.event.files.video.push(obj.video[0])
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
                    var files = [];

                    if ($rootScope.event == undefined) {
                        console.error("Event object not found in rootstate, creating.");
                        $rootScope.event = {};
                    }

                    if ($rootScope.event.files == undefined) {
                        console.warn("Object files not found in event-object, creating");
                        $rootScope.event.files = {
                            audio: [],
                            video: []
                        };
                    }

                    var files = $rootScope.event.files.audio.concat($rootScope.event.files.video);

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
                                            resolve();
                                        }
                                    });
                                });
                            }
                        });
                    });

                });
            };

            this.loadFromStorage();
        });
})(angular);