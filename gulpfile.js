
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

gulp.task('build:all', ['copy:dist', 'build:lib', 'compile:all', 'generate:versionjson']);
gulp.task('compile:all', ['compile:js', 'compile:sass', 'compile:jade']);
gulp.task('check', ['test', 'build:all']);

gulp.task('default', ['clean:all', 'build:all', 'connect', 'watch:all']);