'use strict';

angular.module('myApp.cats', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'cats/cats.html',
    controller: 'CatsCtrl'
  });
}])

.controller('CatsCtrl', ['$scope', '$http', function($scope, $http) {
  // declare array to store the gifs in
  $scope.catGifs = []
  var seenGifs = []

  // fetch the cat gifs on page load
  $http({
    method: 'GET',
    url: 'http://api.giphy.com/v1/gifs/search?q=cats&api_key=dc6zaTOxFJmzC'
  }).then(function success(response){
    $scope.catGifs = response.data.data
    }, function error(error) {
      console.log('error', error)
    })

  // select a different cat gif everytime the button is clicked
  $scope.getGif = function() {
    $scope.catGifUrl = ''
    var selectedCatGifUrl = Math.floor(Math.random() * $scope.catGifs.length)
    checkForSameGifs(selectedCatGifUrl)
  }

  // check for the same image url incase giphy repeats the data
  function checkForSameGifs(selectedCatGifUrl) {
    var selectedGif = $scope.catGifs[selectedCatGifUrl].images.original.url
    var foundIndex = seenGifs.indexOf(selectedGif)
    if(foundIndex === -1) {
      $scope.catGifUrl = $scope.catGifs[selectedCatGifUrl].images.original.url
      seenGifs.push($scope.catGifUrl)
      $scope.catGifs.splice(selectedCatGifUrl, 1)
    } else {
      getGif()
    }
  }
}]);
