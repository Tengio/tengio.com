var gulp = require('gulp');
var inline = require('gulp-inline')
  , uglify = require('gulp-uglify')
  , minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var googleWebFonts = require('gulp-google-webfonts');
var options = {
    fontsDir: 'fonts/',
};

gulp.task('default', ['css', 'images']);

gulp.task('css', ['fonts'], function() {
  return gulp.src('public/index.html')
    .pipe(inline({
      base: 'public/',
      js: uglify,
      css: minifyCss,
      disabledTypes: ['svg', 'img'],
      ignore: ['/font-awesome/css/font-awesome.min.css', '/js/analytics.js']
    }))
    .pipe(gulp.dest('public/'));
});

gulp.task('images', () =>
    gulp.src('public/img/clients/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img/clients/'))
);

gulp.task('fonts', function () {
  return gulp.src('./fonts.list')
	 .pipe(googleWebFonts(options))
	  .pipe(gulp.dest('public/fonts'))
	;
});
