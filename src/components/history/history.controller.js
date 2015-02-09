/*
* TODO:
* 1. Infinity scroll
* 2. Filter with 'gold' parameter
* 3. Caching data (ng-switch will erase it)
* 4. Autoadding data to history (also, in cache)
* 5. Add additional functions (voters count, links, description, uploader and other
*/
'use strict';

angular.module('trigger')
  .controller('HistoryCtrl', function ($scope, Client) {
    $scope.tracks = [];
    Client.getHistory(0, false, function(data) {
      $scope.tracks = data;
      $scope.$apply();
    });
  });
