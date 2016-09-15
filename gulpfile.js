var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var replace = require('gulp-replace');
var inline = require('gulp-inline');
var minifyCss = require('gulp-minify-css');
var shell = require('gulp-shell');

gulp.task('prepare', shell.task([
  'rm -rf public',
  'hugo -s .'
]))

gulp.task('minify-html', ['prepare'], function() {
  return gulp.src('public/**/*.html')
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

gulp.task('default', ['minify-res']);

// ----------------------------
// Other tasks
// ----------------------------

gulp.task('images', function() {
  gulp.src('public/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

// ----------------------------
// Sperimentation with inlining
// ----------------------------
//var googleWebFonts = require('gulp-google-webfonts');

// var options = {
//     fontsDir: 'fonts/',
//     cssDir: 'css/'
// };

// gulp.task('fonts', ['prepare'], function() {
//   return gulp.src('./fonts.list')
// 	 .pipe(googleWebFonts(options))
// 	 .pipe(gulp.dest('public'))
// 	;
// });

// gulp.task('fontsCssPath', ['fonts'], function() {
//   gulp.src('public/css/fonts.css', {base : 'public/css/fonts.css'})
//     .pipe(replace('url(', 'url(/'))
//     .pipe(gulp.dest('public/css/fonts.css'))
// })
