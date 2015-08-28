var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var jade = require('gulp-jade');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var errorify = require('errorify');
var watchify = require('watchify');
var gulpif = require('gulp-if');
var vinylPaths = require('vinyl-paths');
var gopen = require('gulp-open');
var ghPages = require('gulp-gh-pages');
var bump = require('gulp-bump');
var tagVersion = require('gulp-tag-version');
var filter = require('gulp-filter');
var ngAnnotate = require('gulp-ng-annotate');
var uncss = require('gulp-uncss');
var eslint = require('gulp-eslint');

var fs = require('fs');

var watching = false;

var getPaths = function() {
  return JSON.parse(fs.readFileSync('./package.json')).gulp;
};

gulp.task('deploy', function() {
  var paths = getPaths();

  return gulp.src(paths.dist + '**/*')
    .pipe(ghPages());
});

gulp.task('clean', function () {
  var paths = getPaths();

  return gulp.src(paths.dist)
    .pipe(vinylPaths(del))
    .on('error', gutil.log);
});

gulp.task('copyfavicon', ['clean'], function () {
  var paths = getPaths();

  return gulp.src(paths.favicon)
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('buildlibcss', ['clean'], function() {
  var paths = getPaths();

  return gulp.src(paths.libcss)
    .pipe(concat('lib.css'))
    .pipe(minifycss({
      keepSpecialComments: false,
      removeEmpty: true
    }))
    .pipe(gulp.dest(paths.dist + 'css'))
    .on('error', gutil.log);
});

gulp.task('copylibjs', ['clean'], function () {
  var paths = getPaths();

  return gulp.src(paths.libjs)
    .pipe(gulpif(!watching, uglify({outSourceMaps: false})))
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest(paths.dist + 'js'))
    .on('error', gutil.log);
});

gulp.task('compilejs', ['eslint', 'clean'], function () {
  var paths = getPaths();

  var bundler = browserify({
    cache: {}, packageCache: {}, fullPaths: true,
    entries: [paths.entry],
    debug: watching
  })
    .transform(babelify);

  if(watching) {
    bundler.plugin(errorify);
  }

  var bundlee = function() {
    return bundler
      .bundle()
      .pipe(source('js/main.min.js'))
      .pipe(gulpif(!watching, streamify(uglify({outSourceMaps: false}))))
      .pipe(ngAnnotate())
      .pipe(gulp.dest(paths.dist))
      .on('error', gutil.log);
  };

  if (watching) {
    bundler = watchify(bundler);
    bundler.on('update', bundlee);
  }

  return bundlee();
});

gulp.task('eslint', function() {
  var paths = getPaths();

  return gulp.src(paths.js)
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('compileless', ['clean'], function () {
  var paths = getPaths();

  return gulp.src(paths.less)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(concat('css/main.css'))
    .pipe(gulpif(!watching, minifycss({
      keepSpecialComments: false,
      removeEmpty: true
    })))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('compilejade', ['clean'], function() {
  var paths = getPaths();

  return gulp.src(paths.jade)
    .pipe(concat('index.html'))
    .pipe(jade({
      pretty: watching
    }))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('html', ['build'], function() {
  return gulp.src('dist/*.html')
    .pipe(connect.reload())
    .on('error', gutil.log);
});

gulp.task('connect', function () {
  connect.server({
    root: ['./dist'],
    port: 8000,
    livereload: true
  });
});

gulp.task('open', ['build'], function() {
  gulp.src('./dist/index.html')
    .pipe(gopen('', {
      url: 'http://127.0.0.1:8000'
    }));
});

gulp.task('watch', function () {
  var paths = getPaths();

  watching = true;
  return gulp.watch([paths.less, paths.jade, paths.js, 'package.json'], ['html']);
});

gulp.task('bump:patch', function() {
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: 'patch'}))
    .pipe(gulp.dest('./'))
    .pipe(filter('package.json'))
    .pipe(tagVersion({prefix: ''}));
});

gulp.task('bump:minor', function() {
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: 'minor'}))
    .pipe(gulp.dest('./'))
    .pipe(filter('package.json'))
    .pipe(tagVersion({prefix: ''}));
});

gulp.task('bump:major', function() {
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: 'major'}))
    .pipe(gulp.dest('./'))
    .pipe(filter('package.json'))
    .pipe(tagVersion({prefix: ''}));
});

gulp.task('uncss', ['compile'], function() {
  var paths = getPaths();
  return gulp.src(paths.dist + 'css')
      .pipe(uncss({
        html: paths.dist + 'index.html'
      }));
});

gulp.task('default', ['build', 'connect', 'open', 'watch']);
gulp.task('build', ['clean', 'copyfavicon', 'copylibjs', 'buildlibcss', 'compile', 'uncss']);
gulp.task('compile', ['compilejs', 'compileless', 'compilejade']);
