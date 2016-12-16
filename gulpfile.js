const gulp = require('gulp')
const del = require('del')
const babel = require('gulp-babel')
const webpack = require('webpack')

const distDir = 'dist'
const babelOptions = {
    presets: ['es2015'],
    // plugins: ['transform-class-properties', 'transform-runtime']
}

gulp.task('clean', () => {
    del([distDir])
})

gulp.task('build', () => {

   gulp.src('src/**/*.js').pipe(babel(babelOptions)).pipe(gulp.dest(distDir))

    webpack({
    	entry: { 'property-proxy-standalone': './test/property-proxy-standalone.js' },
    	output: {
    		filename: '[name].js',
    		path: distDir
    	},
    	module: {
    		loaders: [
    			{
    				test: /\.js$/,
    				exclude: /node_modules/,
		            loader: 'babel',
		            query: babelOptions
    			}
    		]
    	},
        plugins: [
            new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
        ]
    }, (err, stats) => {
        if (err) throw err
    })
})