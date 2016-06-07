var gulp = require('gulp');
var minCSS = require('gulp-clean-css')
var minJS = require('gulp-uglify')


gulp.task('clean-css', function() {
  return gulp.src('./css/*.css')
    .pipe(minCSS())
    .pipe(gulp.dest('./build/css/'))
});

gulp.task('uglify', function() {
  return gulp.src('./js/*.js')
    .pipe(minJS())
    .pipe(gulp.dest('./build/js/'))
});


gulp.task('minify', ['clean-css', 'uglify']);