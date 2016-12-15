const gulp = require('gulp')
const del = require('del')
const babel = require('gulp-babel')
const webpack = require('webpack')

const distDir = 'dist'

gulp.task('clean', () => {
    del([distDir])
})

gulp.task('standalone', () => {
    // del.sync([distDir])

    webpack({
    	entry: { 'property-proxy-standalone': './src/property-proxy-standalone.js' },
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
                        "presets": ["es2015"],
                        "plugins": [
                        // 'transform-runtime',
                        // 'transform-class-properties'
                        ]
                    }
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