var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    sassLint = require('gulp-sass-lint'),
    sourcemaps = require('gulp-sourcemaps');



gulp.task('compile-change:scss', function() {
  gulp.watch('assets/sass/**/*.scss', ['sass:dev']);
});

// to check sass for any wrong coding conventions
gulp.task('check:sass', function(){
  return gulp.src(['assets/sass/**/*.scss'])
  .pipe(sassLint(
    {
      'endless' : true
    }
  ))
  .pipe(sassLint.format())
})

// compile sass for production
gulp.task('sass', function() {
  return gulp.src(['assets/sass/**/*.scss'])
  .pipe(sourcemaps.init())
  .pipe(concat('index.scss'))
  .pipe(sass().on('error', function(){
    gutil.log(gutil.colors.bgBlue.red('ERROR : SCSS COMPILATION FAILED'));
  }))
  .pipe(sourcemaps.write('sourcemaps'))
  .pipe(gulp.dest('dist/css'))
});


// compile sass for development
gulp.task('sass:dev', function() {
  return gulp.src(['assets/sass/**/*.scss'])
  .pipe(sourcemaps.init())
  .pipe(concat('index.scss'))
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('sourcemaps'))
  .pipe(gulp.dest('assets/css'))
});


// watcher for any change
gulp.task('watch:style', [
  'compile-change:scss',
  'check:sass',
  'sass:dev'
]);
