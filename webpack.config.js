const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require ('copy-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",

});

const copyplugin =new CopyWebpackPlugin ([{
  from:  path.join(__dirname, './client/public')
}])


module.exports = {

  mode: 'production',
  entry: [
    './client/src/index.js' 
],
  
  
  
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude:[ '/node_modules/','/server/','/config/'],
        include: path.join(__dirname, './client'),
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
    }

 
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html'
    }),

    extractSass,
    copyplugin
  ]

};
