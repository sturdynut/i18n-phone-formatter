const gulp = require('gulp');
const umd = require('gulp-umd');
const babel = require('gulp-babel');

gulp.task('default', function() {
  return gulp.src('./src/index.js')
    .pipe(babel())
    .pipe(umd())
    .pipe(gulp.dest('dist'));
});