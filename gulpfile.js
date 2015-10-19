
require('babel/register');

var gulp = require('gulp');

require('./gulp/browser');
require('./gulp/clean');
require('./gulp/compile');
require('./gulp/copy');
require('./gulp/lint');
require('./gulp/test');
require('./gulp/version');
require('./gulp/watch');

gulp.task('bump:patch', ['bump:patch:tag', 'bump:patch:commit']);
gulp.task('bump:minor', ['bump:minor:tag', 'bump:minor:commit']);
gulp.task('bump:major', ['bump:major:tag', 'bump:major:commit']);

gulp.task('release:patch', ['bump:patch', 'deploy']);
gulp.task('release:minor', ['bump:minor', 'deploy']);
gulp.task('release:major', ['bump:major', 'deploy']);

gulp.task('build:all', ['copy:dist', 'build:lib', 'compile:all']);
gulp.task('compile:all', ['compile:js', 'compile:sass', 'compile:jade']);
gulp.task('check', ['test', 'build:all']);

gulp.task('default', ['clean:all', 'build:all', 'connect', 'watch:all']);