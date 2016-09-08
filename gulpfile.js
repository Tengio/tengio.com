var gulp = require('gulp');
var replace = require('gulp-replace');
var inline = require('gulp-inline')
  , uglify = require('gulp-uglify')
  , minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var googleWebFonts = require('gulp-google-webfonts');
var options = {
    fontsDir: 'fonts/',
    cssDir: 'css/'
};

gulp.task('default', ['minify']);

gulp.task('minify', ['css', 'images'], function() {
  return gulp.src('public/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

gulp.task('css', ['fontsCssPath'], function() {
  return gulp.src('public/**/index.html')
    .pipe(inline({
      base: 'public/',
      js: uglify,
      css: minifyCss,
      disabledTypes: ['svg', 'img'],
      ignore: ['/js/analytics.js']
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

gulp.task('images', function() {
  gulp.src('public/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

gulp.task('fontsCssPath', ['fonts'], function() {
  gulp.src('public/css/fonts.css', {base : 'public/css/fonts.css'})
    .pipe(replace('url(', 'url(/'))
    .pipe(gulp.dest('public/css/fonts.css'))
})

gulp.task('fonts', function() {
  return gulp.src('./fonts.list')
	 .pipe(googleWebFonts(options))
	 .pipe(gulp.dest('public'))
	;
});
