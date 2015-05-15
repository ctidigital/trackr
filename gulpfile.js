var gulp = require('gulp');
var karma = require('gulp-karma');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var bulkSass = require('gulp-sass-bulk-import');
var ngConstant = require('gulp-ng-constant');
var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'production']);

gulp.task('production', function () {
    gulp.src('env/production.json')
        .pipe(ngConstant())
        .pipe(rename('config.js'))
        // Writes config.js to dist/ folder
        .pipe(gulp.dest('./www/js/'));
});

gulp.task('local', function () {
    gulp.src('env/local.json')
        .pipe(ngConstant())
        .pipe(rename('config.js'))
        // Writes config.js to dist/ folder
        .pipe(gulp.dest('./www/js/'));
});

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(bulkSass())
        .pipe(sass({
            compass: true,
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('test', function() {
    // Be sure to return the stream
    // NOTE: Using the fake './foobar' so as to run the files
    // listed in karma.conf.js INSTEAD of what was passed to
    // gulp.src !
    return gulp.src('./foobar')
        .pipe(karma({
            configFile: './tests/karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            console.log(err);
            this.emit('end'); //instead of erroring the stream, end it
        });
});

gulp.task('autotest', function() {
    return gulp.watch(['./www/js/**/*.js', './tests/spec/*.js'], ['test']);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
