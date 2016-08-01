var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    eslint = require('gulp-eslint');

gulp.task('check:js', function () {
    return gulp.src(['app/app.js', 'app/**/*.js', 'config/*.js'])
              .pipe(eslint())
              .pipe(eslint.format());
});

gulp.task('compile-change:js', function() {
  gulp.watch(['app/app.js', 'app/**/*.js', 'config/*.js'], ['script:dev']);
});


gulp.task('script', function () {
  return gulp.src(['app/app.js', 'app/**/*.js', 'config/*.js'])
              .pipe(eslint())
              .pipe(eslint.format())
              .pipe(sourcemaps.init())
              .pipe(concat('index.js'))
              .pipe(ngAnnotate())
              .pipe(sourcemaps.write('sourcemaps'))
              .pipe(gulp.dest('dist/js'))
});

gulp.task('script:dev', function () {
  return gulp.src(['app/app.js', 'app/**/*.js', 'config/*.js'])
              .pipe(eslint())
              .pipe(eslint.format())
              .pipe(sourcemaps.init())
              .pipe(concat('index.js'))
              .pipe(ngAnnotate())
              .pipe(sourcemaps.write('sourcemaps'))
              .pipe(gulp.dest('assets/js'))
});

gulp.task('watch:script', [
  'compile-change:js',
  'check:js',
  'script:dev'
]);
