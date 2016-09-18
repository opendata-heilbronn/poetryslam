(function (angular) {
    'use strict';

    angular.module('ps.storage')
        .service('FileService', function (env, ChromeFileService, WebFileService) {
            var services = [ChromeFileService, WebFileService];
            var supportedServices = services.filter(function (service) {
                return service.supportsRuntime(env.runtime);
            });
            if (supportedServices.length <= 0) throw new Error('no file service found');

            supportedServices[0].setup();
            return supportedServices[0];
        })
        .service('ChromeFileService', function ($q) {
            var objectUrlCache = {};

            this.supportsRuntime = function (runtime) {
                return runtime === 'chrome';
            };

            this.setup = function () {
                // nothing to do
            };

            this.isRecoverable = function () {
                return true;
            };

            this.askForFiles = function (mimetypes, multiple) {
                return $q(function (resolve, reject) {
                    var options = {type: 'openFile', acceptsMultiple: multiple ? true : false};
                    if (mimetypes) {
                        options.accepts = [{mimeTypes: [mimetypes]}];
                    } else {
                        options.acceptsAllTypes = true;
                    }
                    chrome.fileSystem.chooseEntry(options, function (entries) {
                        if (!entries) reject();
                        var entriesArray = Array.isArray(entries) ? entries : [entries];
                        var publicFileObjs = entriesArray.map(function (entry) {
                            return {
                                id: chrome.fileSystem.retainEntry(entry),
                                name: entry.name
                            };
                        });
                        resolve(publicFileObjs);
                    });
                });
            };

            this.getObjectUrl = function (id) {
                return $q(function (resolve, reject) {
                    if (objectUrlCache[id]) {
                        resolve(objectUrlCache[id]);
                    } else {
                        chrome.fileSystem.isRestorable(id, function (isRestorable) {
                            if (!isRestorable) {
                                reject();
                            }
                            chrome.fileSystem.restoreEntry(id, function (entry) {
                                entry.file(function (file) {
                                    objectUrlCache[id] = URL.createObjectURL(file);
                                    resolve(objectUrlCache[id]);
                                });
                            });
                        });
                    }
                })
            };

            this.remove = function (id) {
                if (objectUrlCache[id]) {
                    URL.revokeObjectURL(objectUrlCache[id]);
                    delete objectUrlCache[id];
                }
            };
        })
        .service('WebFileService', function ($q) {
            var fileElement;
            var fileCallback;
            var nextId = 1;
            var knownFiles = {};

            var onFileInputChange = function (event) {
                if (!fileCallback) {
                    console.error('no callback for handling of selected files specified');
                    return false;
                }
                var files = event.target.files;
                var publicFileObjs = [];
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    knownFiles[nextId] = window.URL.createObjectURL(file);
                    publicFileObjs.push({
                        id: nextId,
                        name: file.name
                    });
                    nextId++;
                }
                fileCallback(publicFileObjs);
            };

            this.supportsRuntime = function (runtime) {
                return runtime === 'web';
            };

            this.setup = function () {
                fileElement = document.createElement('input');
                fileElement.setAttribute('type', 'file');
                fileElement.style.display = 'none';
                fileElement.addEventListener('change', onFileInputChange);
                document.body.appendChild(fileElement);
            };

            this.askForFiles = function (mimetypes, multiple) {
                if (mimetypes) {
                    fileElement.setAttribute('accept', mimetypes);
                } else {
                    fileElement.removeAttribute('accept');
                }
                if (multiple) {
                    fileElement.setAttribute('multiple', 'multiple');
                } else {
                    fileElement.removeAttribute('multiple');
                }
                var promise = $q(function (resolve) {
                    fileCallback = resolve;
                });
                fileElement.click();
                return promise;
            };

            this.getObjectUrl = function (id) {
                return $q.resolve(knownFiles[id]);
            };

            this.isRecoverable = function () {
                return false;
            };

            this.remove = function (id) {
                if (knownFiles[id]) {
                    URL.revokeObjectURL(knownFiles[id]);
                    delete knownFiles[id];
                }
            };
        });
})(angular);