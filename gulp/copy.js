
const gulp = require('gulp');
const util = require('gulp-util');

const getPaths = require('./_common').getPaths;

gulp.task('copy:favicon', () => {
  return gulp.src(getPaths().favicon)
    .pipe(gulp.dest(getPaths().dist))
    .on('error', util.log);
});

gulp.task('copy:cname', () => {
  return gulp.src('CNAME')
    .pipe(gulp.dest(getPaths().dist))
    .on('error', util.log);
});

gulp.task('copy:font', () => {
  return gulp.src(getPaths().font)
    .pipe(gulp.dest(`${getPaths().dist}/fonts`))
    .on('error', util.log);
});

gulp.task('copy:nw', () => {
  return gulp.src(['./package.json', 'nw-setup/**/*'])
    .pipe(gulp.dest(getPaths().dist))
    .on('error', util.log);
});

gulp.task('copy:dist', ['copy:favicon', 'copy:font', 'copy:cname']);