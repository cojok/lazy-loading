var path = require('path');

module.exports =  {

    entry: './src/main.js',
    output: {
        filename: 'build/lazyLoading.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
}