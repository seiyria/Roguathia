
const gulp = require('gulp');
const fs = require('fs');
const git = require('gulp-git');
const bump = require('gulp-bump');
const filter = require('gulp-filter');
const tagVersion = require('gulp-tag-version');

const runSequence = require('run-sequence');
const changelog = require('conventional-changelog');

const currentTag = require('./_common').currentTag;

const versionSources = ['./bower.json', './package.json'];

const execSync = require('child_process').execSync;

const versionStream = (type) => {
  return gulp.src(versionSources)
    .pipe(bump({ type: type }))
    .pipe(gulp.dest('./'))
    .pipe(filter('package.json'))
    .pipe(tagVersion({ prefix: '' }));
};

const commitStream = (type) => {
  const tag = currentTag();
  return gulp.src(versionSources.concat('CHANGELOG.md'))
    .pipe(git.commit(`chore(version): release ${type} version ${tag}`, function() {
      git.push();
      git.push('origin', 'master', { args: '--tags' });
    }));
};

const pushStream = () => {
  git.push();
  git.push('origin', 'master', { args: '--tags' });
};

gulp.task('generate:versionjson', ['compile:all'], function() {
  fs.writeFileSync('dist/version.json', JSON.stringify({
    tag: execSync('git describe --abbrev=0').toString().trim(),
    hash: execSync('git log --pretty=format:\'%H\' -1').toString().trim(),
    date: execSync('git log --pretty=format:\'%ad\' --date=short -1').toString().trim(),
    longDate: execSync('git log --pretty=format:\'%ad\' -1').toString().trim()
  }));
});

gulp.task('generate:changelog', () => {
  return changelog({
    releaseCount: 0,
    preset: 'angular'
  })
    .pipe(fs.createWriteStream('CHANGELOG.md'));
});

gulp.task('bump:patch:tag', () => versionStream('patch'));
gulp.task('bump:minor:tag', () => versionStream('minor'));
gulp.task('bump:major:tag', () => versionStream('major'));

gulp.task('bump:patch', () => runSequence('bump:patch:tag', 'generate:versionjson', 'generate:changelog', () => commitStream('patch') && pushStream()));
gulp.task('bump:minor', () => runSequence('bump:minor:tag', 'generate:versionjson', 'generate:changelog', () => commitStream('minor') && pushStream()));
gulp.task('bump:major', () => runSequence('bump:major:tag', 'generate:versionjson', 'generate:changelog', () => commitStream('major') && pushStream()));

gulp.task('release:patch', () => runSequence('bump:patch', 'deploy'));
gulp.task('release:minor', () => runSequence('bump:minor', 'deploy'));
gulp.task('release:major', () => runSequence('bump:major', 'deploy'));