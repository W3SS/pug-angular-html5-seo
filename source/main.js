console.log('main.js');
var mainjd = require('../podcast.json');
var unixToHuman = require('../unixToHuman.js');
var app = angular.module('app', ['ngRoute']);
app.config([
  '$locationProvider',
  '$routeProvider',
  function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', {
      template: '<h2>Newest Episode</h2><episode-brief episode="podcastData.episodes[0]"></episode-brief>',
      controller: 'main'
    }).when('/episodes', {
      template: '<h2>All Episodes</h2><episode-brief ng-repeat="episode in podcastData.episodes track by $index" episode="episode"></episode-brief>',
      contoller: 'main'
    }).when('/ep/:slug', {
      template: '{{debug}} jjjjjjjjjjjjj',
      controller: 'ep'
    }).otherwise({ redirectTo: '/' });
  }
]);
app.run([
  '$rootScope',
  '$http',
  function ($rootScope, $http) {
    $rootScope.toHuman = unixToHuman;
    $rootScope.podcastData = { episodes: [{ mp3: {} }] };
    $http.get('/podcast.json').then(function (podcastData) {
      $rootScope.podcastData = podcastData.data;
    }, console.log);
  }
]);
app.directive('episodeBrief', function () {
  return {
    restrict: 'E',
    scope: { episode: '=' },
    link: function (scope) {
    },
    templateUrl: '/templates/episode-brief'
  };
});
app.directive('episodeComplete', function () {
  return {
    restrict: 'E',
    scope: { episode: '=' },
    link: function (scope) {
    },
    templateUrl: '/templates/episode-complete'
  };
});
app.controller('main', [
  '$scope',
  function ($scope) {
    $scope.title = 'tess';
  }
]);
app.controller('ep', [
  '$scope',
  '$route',
  '$routeParams',
  function ($scope, $route, $routeParams) {
    $scope.debug = $routeParams;
  }
]);