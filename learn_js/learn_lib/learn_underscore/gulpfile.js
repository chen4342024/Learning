var gulp = require('gulp'),
    Server = require('karma').Server,
    jasmine = require('gulp-jasmine');

/**
 * Run test once and exit
 */
gulp.task('test', function(done) {
    var karma = new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
    karma.start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function(done) {
    var karma = new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done);
    karma.start();
});

gulp.task('default', ['tdd']);