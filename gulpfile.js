const gulp = require('gulp')
const del = require('del')
const babel = require('gulp-babel')
const webpack = require('webpack')

const entry = {
	'property-proxy': './entry/property-proxy.js',
	'property-proxy-standalone': './entry/property-proxy-standalone.js'
}
const distDir = 'dist'

gulp.task('default', () => {
    del.sync([distDir])

    webpack({
    	entry: entry,
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
		            query: {
		                presets: ['es2015'],
		                plugins: [
		                    'transform-runtime',
		                    'transform-class-properties'
		                ]

		            }
    			}
    		]
    	}
    }, (err, stats) => {
        if (err) throw err
    })
})