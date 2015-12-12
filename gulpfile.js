'use strict'

var gulp  = require('gulp'),
    babel = require('gulp-babel')

gulp.task('build', function() {
  return gulp.src('src/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('scripts'))
})

gulp.task('watch', ['build'], function() {
  gulp.watch(['src/*.js'], ['build'])
})

gulp.task('default', ['build'])
