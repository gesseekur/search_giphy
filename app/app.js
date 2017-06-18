'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.search',
  'ngMaterial',
  'ngAnimate',
  'ngMessages',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/', {
    templateUrl: 'views/search.html',
    controller: 'SearchCtrl'
  });

  $routeProvider.otherwise({redirectTo: '/'});
}]);
