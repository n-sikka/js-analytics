var gulp = require('gulp'),
    fs = require('fs');


/*import files from 'gulp/'' */
fs.readdirSync(__dirname + '/gulp').forEach(function(task) {
    require('./gulp/' + task)
})

// build assets for development environment
gulp.task('build:dev', ['script:dev', 'inject', 'sass:dev']);

// enable watch for scripts and styles and create js and style in dist/
gulp.task('watch', ['watch:script', 'watch:style']);

// build assets for production
gulp.task('build:prod', ['sass', 'script']);

// run localhost for development
gulp.task('serve', ['connect', 'inject', 'watch']);
