
'use strict';
var gulp = require('gulp'),
	ts = require('gulp-typescript'),
	tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', function() {
    var tsResult = tsProject.src()
        .pipe(tsProject());
 
    return tsResult.js.pipe(gulp.dest('bin/'));
});
