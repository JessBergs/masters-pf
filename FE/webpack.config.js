const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );

module.exports = {
  entry: './src/index.js', // relative path
  output: {
    path: path.join(__dirname, 'dist'), // absolute path
    filename: 'main.js', // file name
    libraryTarget: 'commonjs',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  externals: [nodeExternals()],
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'media/'
            }
          }
    ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
       template: "./public/index.html",
       filename: 'index.html'
    })
 ]
};

