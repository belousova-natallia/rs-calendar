

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public',
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
             query: {
          presets: ['es2015','react']
        }
        }],
    },
      
    devtool: 'source-map',
}
