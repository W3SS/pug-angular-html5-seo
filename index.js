var jsonfile = require('jsonfile');
var express = require('express');
var app = express();
var path = require('path');
var pug = require('pug');
var filters = pug.filters;
app.set('views', './views');
var moment = require('moment');
var unixToString = function (unix) {
  return moment.unix(unix).format('dddd, MMMM Do YYYY, h:mm:ss A');
};
app.set('view engine', 'pug');
app.use('/static', express.static(__dirname + '/build'));
app.get('/podcast.json', function (req, res) {
  res.send(jsonfile.readFileSync('podcast.json'));
});
app.get('/templates/:template', function (req, res) {
  var template = req.params.template;
  res.render('includes/' + template, {
    template: true,
    moment: unixToString,
    feed: jsonfile.readFileSync('template.json')
  });
});
app.get('/episodes', function (req, res) {
  var static = req.query.hasOwnProperty('escaped_fragment') || req.query.hasOwnProperty('social') || req.query.hasOwnProperty('static');
  res.render('episodes', {
    static: static,
    moment: unixToString,
    feed: jsonfile.readFileSync('podcast.json')
  });
});
app.get('*', function (req, res) {
  var static = req.query.hasOwnProperty('escaped_fragment') || req.query.hasOwnProperty('social') || req.query.hasOwnProperty('static');
  res.render('index', {
    static: static,
    moment: unixToString,
    feed: jsonfile.readFileSync('podcast.json')
  });
});
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  //console.dir(jsonfile.readFileSync('podcast.json'));
  console.log('localhost:' + app.get('port'));
});