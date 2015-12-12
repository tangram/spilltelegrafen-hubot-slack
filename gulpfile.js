'use strict'

var gulp  = require('gulp'),
    babel = require('gulp-babel')

function log(message) {
  console.log(message.toString())
  this.emit('end')
}

gulp.task('build', function() {
  return gulp.src('src/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('scripts'))
})

gulp.task('default', ['build'])
