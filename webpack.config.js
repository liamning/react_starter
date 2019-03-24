const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
var HtmlStringReplace = require('html-string-replace-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].fonts.css');
const extractSCSS = new ExtractTextPlugin('[name].styles.css');

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

//console.log('BUILD_DIR', BUILD_DIR);
//console.log('SRC_DIR', SRC_DIR);

module.exports = (env = {}) => {
  return {
    entry: {
      index: [SRC_DIR + '/index.js']
    },
    output: {
      path: BUILD_DIR,
      filename: '[name].bundle.js'
    },
    // watch: true,
    devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: BUILD_DIR,
      //   port: 9001,
      compress: true,
      hot: true,
      open: true
    },
    module: {
      
      rules: [
        
        // {
        //   test: /\.jsx$/,
        //   use: {
        //     loader: 'babel-loader',
        //     options: {
        //       cacheDirectory: true,
        //       presets: ['react','es2015', 'stage-2']
        //     }
        //   }
        // },
         {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['react', 'env'],
              plugins: ["babel-plugin-transform-class-properties","es6-promise"]

              // "presets": [["es2015", { "modules": false }], "stage-2", "react"],
              // "env": {
              //   "production": {
              //     "plugins": ["transform-react-remove-prop-types"]
              //   }
              // }


            }
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(scss)$/,
          use: ['css-hot-loader'].concat(extractSCSS.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {alias: {'../img': '../public/img'}}
              },
              {
                loader: 'sass-loader'
              }
            ]
          }))
        },
        {
          test: /\.css$/,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: [
            {
              // loader: 'url-loader'
              loader: 'file-loader',
              options: {
                name: './img/[name].[hash].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[hash].[ext]'
          }
        }]
    },
    resolve: {
      modules: ['node_modules']
    },
    plugins:  env.prod ?
    [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production"),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
      }), 
      new CompressionPlugin({ 
        algorithm: 'gzip'
      }),
     
      extractCSS,
      extractSCSS,
      new HtmlWebpackPlugin(
        {
          inject: true,
          template: './public/index.html'
        }
      ),
        new HtmlStringReplace({
          enable: true,
          patterns: [
              {
                  match: /@@domain/g,
                  replacement: function (match) {
                      return '';
                  }
              },
          ]
      }),
      new CopyWebpackPlugin([
          {from: './public/img', to: 'img'}
        ],
        {copyUnmodified: false}
      ), 
    ]
    :
    [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      extractCSS,
      extractSCSS,
      new HtmlWebpackPlugin(
        {
          inject: true,
          template: './public/index.html'
        }
      ),
          new HtmlStringReplace({
            enable: true,
            patterns: [
                {
                    match: /@@domain/g,
                    replacement: function (match) {
                        return 'http://localhost:806';
                    }
                },
            ]
        }),
      new CopyWebpackPlugin([
          {from: './public/img', to: 'img'}
        ],
        {copyUnmodified: false}
      ), 
    ]
  }
};