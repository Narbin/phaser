
'use strict';
var gulp = require('gulp'),
	ts = require('gulp-typescript'),
	tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', function() {
    var tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('bin/'));
});


gulp.task('watch', function() {
    gulp.watch('src/**/*.ts', gulp.series('typescript'));
});