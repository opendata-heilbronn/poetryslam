var gulp = require('gulp');
var del = require('del');
var ghPages = require('gulp-gh-pages');
var manifest = require('gulp-manifest');
var usemin = require('gulp-usemin');

/**
 * build tasks
 */
gulp.task('clean', function (cb) {
    del(['build/**'], cb);
});
gulp.task('copy-images', ['clean'], function () {
    return gulp.src('src/media/**/*')
        .pipe(gulp.dest('build/media'));
});
gulp.task('copy-fonts', ['clean'], function () {
    return gulp.src('src/fonts/**')
        .pipe(gulp.dest('build/fonts'));
});
gulp.task('copy-icons', ['clean'], function () {
    return gulp.src('src/material-icons/**')
        .pipe(gulp.dest('build/material-icons'));
});
gulp.task('copy-modules', ['clean'], function () {
    return gulp.src('src/modules/**/*.html')
        .pipe(gulp.dest('build/modules'));
});
gulp.task('copy-html', ['clean'], function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'));
});
gulp.task('copy-cname', ['clean'], function () {
    return gulp.src('CNAME')
        .pipe(gulp.dest('build'));
});
gulp.task('manifest', ['package'], function () {
    gulp.src(['build/**/*'], {base: './build/'})
        .pipe(manifest({
            hash: true,
            network: [],
            filename: 'app.manifest',
            exclude: ['app.manifest', 'CNAME']
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('package', ['copy-images', 'copy-fonts', 'copy-icons', 'copy-modules', 'copy-html', 'copy-cname'], function () {
    gulp.src('src/*.html')
        .pipe(usemin({
            css: ['concat'],
            js: ['concat']
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('build', ['manifest']);

gulp.task('deploy', ['build'], function () {
    return gulp.src('./build/**/*')
        .pipe(ghPages());
});