var gulp = require('gulp');
var replace = require('gulp-replace');
var inline = require('gulp-inline')
  , uglify = require('gulp-uglify')
  , minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var shell = require('gulp-shell');
var googleWebFonts = require('gulp-google-webfonts');
// var options = {
//     fontsDir: 'fonts/',
//     cssDir: 'css/'
// };

gulp.task('prepare', shell.task([
  'rm -rf public',
  'hugo -s .'
]))

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

gulp.task('css', ['prepare'], function() {
  return gulp.src('public/**/index.html')
    .pipe(inline({
      base: 'public/',
      js: uglify,
      css: minifyCss,
      disabledTypes: ['svg', 'img'],
      ignore: ['https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
               'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css',
               'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js',
               'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
               'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css',
               '/js/jquery.easing.min.js',
               'https://fonts.googleapis.com/css?family=Roboto:400,300,500,700']
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

gulp.task('images', ['css'], function() {
  gulp.src('public/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

gulp.task('minify', ['images'], function() {
  return gulp.src('public/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

gulp.task('default', ['minify']);
