
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const cache = require('gulp-cached');
const gulpIf = require('gulp-if');
const through2 = require('through2');

const getPaths = require('./_common').getPaths;

const isLinty = (file) => {
  return file.eslint != null
    && (file.eslint.warningCount > 0 || file.eslint.errorCount > 0);
};

const uncache =(cacheName) => {
  return through2.obj((file, enc, done) => {
    if (cache.caches[cacheName]) {
      delete cache.caches[cacheName][file.path];
    }
    done(null, file);
  });
};

gulp.task('eslint', () => {
  return gulp.src(getPaths().js)
    .pipe(cache('lint-cache'))
    .pipe(eslint({ useEslintrc: true, cache: true }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(gulpIf(isLinty, uncache('lint-cache')));
});