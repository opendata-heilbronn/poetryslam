// Karma configuration
// Generated on Thu Jul 07 2016 20:00:40 GMT+0200 (CEST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'src/components/jquery/dist/jquery.min.js',
            'src/components/angular/angular.js',
            'src/components/angular-material/angular-material.js',
            'src/components/angular-animate/angular-animate.js',
            'src/components/angular-aria/angular-aria.js',
            'src/components/angular-route/angular-route.js',
            'src/components/Sortable/Sortable.js',
            'src/components/Sortable/ng-sortable.js',
            'src/components/odometer/odometer.js',
            'src/components/Flowtype.js/flowtype.js',
            'src/components/angular-flowtype/angular-flowtype.js',
            'src/components/angular-file-saver/dist/angular-file-saver.bundle.js',
            'src/components/ng-file-upload/ng-file-upload.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/modules/presentation/ps.presentation.js',
            'src/modules/sync/ps.sync.js',
            'src/modules/ps.js',
            'src/modules/admin/ps.admin.js',
            'src/modules/**/*.js',
            'src/modules/**/*.html',
            'test/**/*.spec.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/modules/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/',
            moduleName: 'templates'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
