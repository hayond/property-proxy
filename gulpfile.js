const gulp = require('gulp')
const del = require('del')
const babel = require('gulp-babel')

var distDir = 'dist/src'

gulp.task('default', () => {
    del.sync([distDir])

    gulp.src('src/**/*.js').pipe(babel({
        presets: ['es2015'],
        plugins: ['transform-class-properties', 'transform-runtime']
    })).pipe(gulp.dest(distDir))
})