'use strict';

angular.module('myApp.search', ['ngRoute'])

.controller('SearchCtrl', ['$scope', '$http', '$mdDialog', function($scope, $http, $mdDialog) {

// search gifs
  $scope.search = function() {
    $http({
      method: 'GET',
      url: 'http://api.giphy.com/v1/gifs/search?q=' + $scope.searchedItem+ '&api_key=dc6zaTOxFJmzC'
    }).then(function success(response){
        $scope.giphys = response.data.data
        console.log('giphys', $scope.giphys)
      }, function error(error) {
        console.log('error', error)
      })
    }

// show enlarged gif
  $scope.showEnlargedGif = function(url, $event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      locals: {
        url: url
      },
      controller: ['$scope', 'url', function($scope, url) {
        $scope.url = url;

        $scope.closeDialog = function(){
          $mdDialog.hide();
        }
      }],
      templateUrl: 'views/enlarged_gif.html',
      clickOutsideToClose: true,
      preserveScope: true

    })
  }
}]);
