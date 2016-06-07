var gulp = require('gulp');
var minCSS = require('gulp-clean-css');
var minJS = require('gulp-uglify');
var gpconcat = require('gulp-concat');
var gprename = require('gulp-rename');

gulp.task('clean-css', function() {
  return gulp.src(['./css/normalize.css', './css/main.css'])
    .pipe(gpconcat('main.min.css'))
    .pipe(minCSS())
    .pipe(gulp.dest('./build/css/'))
});

gulp.task('uglify', function() {
  return gulp.src(['./js/**/*.js'])
    .pipe(gpconcat('build.min.js'))
    .pipe(minJS())
    .pipe(gulp.dest('./build/js/'))
});

gulp.task('minify', ['clean-css', 'uglify']);