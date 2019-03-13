const gulp = require('gulp');
const umd = require('gulp-umd');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('default', function() {
  return gulp.src('./src/index.js')
    .pipe(babel())
    .pipe(umd())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});