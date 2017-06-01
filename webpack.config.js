var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: [
    path.join(__dirname, 'node_modules/angular/angular.js'),
    path.join(__dirname, 'node_modules/angular-route/angular-route.js'),
    path.join(__dirname, 'source/main.js')
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'main.js'
  }
};