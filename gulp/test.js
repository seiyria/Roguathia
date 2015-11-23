
const gulp = require('gulp');
const mocha = require('gulp-mocha');

const getPaths = require('./_common').getPaths;

gulp.task('test', function() {
  const paths = getPaths();

  gulp.src(paths.testjs)
    .pipe(mocha());
});