var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var replace = require('gulp-replace');
var inline = require('gulp-inline');
var minifyCss = require('gulp-minify-css');
var shell = require('gulp-shell');
var ngConfig = require('gulp-ng-config');

require('dotenv').load();

gulp.task('clean', shell.task(['rm -rf public']))

gulp.task('prepare', ['clean'], shell.task(['hugo -s .']))

gulp.task('blog-image-cdn', ['prepare'], function() {
  gulp.src(['public/blog/**/*', 'public/tags/**/*'])
       .pipe(replace('src="/img/blog/', 'src="https://raw.githubusercontent.com/Tengio/tengio.com/master/static/img/blog/'))
       .pipe(gulp.dest(function(file) {
         return file.base;
       }));
});

gulp.task('minify-html', ['blog-image-cdn'], function() {
  return gulp.src(['public/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

gulp.task('minify-res', ['minify-html'], function() {
  return gulp.src('public/**/index.html')
    .pipe(inline({
      base: 'public/',
      js: uglify,
      css: minifyCss,
      disabledTypes: ['svg', 'img'],
      ignore: ['http*']
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

gulp.task('replace-slack-token', ['minify-res'], function() {
  return gulp.src('public/gocontacts/gocontacts.go')
    .pipe(replace('{{slack-integration-url}}', process.env.SLACK_INTEGRATION_URL || ''))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

// -----------------------------------
// Core tasks
// -----------------------------------
gulp.task('default', ['clean'], shell.task(['hugo server --buildDrafts -w -v --destination public .']))
gulp.task('start', ['replace-slack-token'], shell.task(['dev_appserver.py public']))
gulp.task('deploy', ['replace-slack-token'], shell.task(['appcfg.py update -v public']))
gulp.task('clean', shell.task(['rm -rf public']))

// -----------------------------------
// Manual task used to optimize images
// -----------------------------------
gulp.task('images-optimization', function() {
  gulp.src('public/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});
