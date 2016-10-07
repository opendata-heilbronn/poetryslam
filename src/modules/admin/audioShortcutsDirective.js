(function () {
    'use strict';
    angular.module('psadmin').directive('audioShortcuts', function () {
        return {
            restrict: 'EA',
            link: function (scope) {
                var onKeyDown = function (e) {
                    if (e.ctrlKey) {
                        if (e.key === "S" || e.key === "s") {
                            scope.event.sound = null;
                            scope.$root.$emit('sound.change');
                            scope.$apply();
                        } else {
                            var index = parseInt(e.key) - 1;
                            // 1 =^ 0, 2 =^ 1,... and 0 =^ 10  (key =^ soundindex)
                            if (index == -1) {
                                index = 10;
                            }
                            if (!isNaN(index) && index < 11 && Array.isArray(scope.$root.event.sounds) && scope.$root.event.sounds[index]) {
                                var newSound = scope.$root.event.sounds[index];
                                if (scope.$root.event.sound == newSound) {
                                    scope.$root.$emit('sound.pause');
                                } else {
                                    scope.$root.event.sound = newSound;
                                    scope.$root.$emit('sound.change');
                                    scope.$root.$emit('sound.play');
                                }
                                scope.$apply();
                            }
                        }
                    }
                };

                window.addEventListener("keydown", onKeyDown);
                scope.$on('$destroy', function () {
                    window.removeEventListener("keydown", onKeyDown);
                });
            }
        }
    });
})();