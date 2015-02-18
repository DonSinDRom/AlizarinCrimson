'use strict';

angular.module('trigger')
  .controller('ConsoleCtrl', function ($scope, $rootScope, $timeout, $mdDialog, $mdBottomSheet, Client) {
    $scope.users = {
      'listeners': 0,
      'active': 0
    };
    $scope.user = {
      'name': '%username%',
      'uplim': 0
    };
    var audio = document.getElementById('audio');
    $scope.volume = 50;
    $scope.changeVolume = function(volume) {
      audio.volume = volume/100;
    };

    $scope.$watch(function() {
      return $rootScope.load.welcome;
    }, function() {
      if ($rootScope.load.welcome === true) {
        $scope.users.listeners = Client.channel.lst;
        $scope.users.active = Client.channel.a;
        $(Client).bind('listners', function(event, data) {
          $scope.users.listeners = data.l;
          $scope.users.active = data.a;
          $scope.$digest();
        });
      }
      $scope.load.welcome = $rootScope.load.welcome;
    }, true);

    $scope.$watch(function() {
      return $rootScope.load.signed;
    }, function() {
      if ($rootScope.load.signed === true) {
        console.log('Client.user', Client.user);
        $scope.user.name = Client.user.n;
        $scope.user.uplim = Client.user.t;
        $(Client).bind('updatelimits', function(event, data) {
          $scope.user.uplim = data.t;
          console.log('updatelimits', data);
        });
      }
      $scope.load.signed = $rootScope.load.signed;
    }, true);

    $scope.data = function() {
      console.log('data', Client);
    };

    $scope.showLoginModal = function(ev) {
      $mdDialog.show({
        controller: LoginCtrl,
        templateUrl: 'components/login/login.html',
        targetEvent: ev,
      });
    };
    function LoginCtrl($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
    }
    $scope.openUploadBar = function($event) {
      $scope.alert = '';
      $mdBottomSheet.show({
        templateUrl: 'components/upload/upload.html',
        controller: 'UploadCtrl',
        targetEvent: $event
      }).then(function(clickedItem) {
        $scope.alert = clickedItem.name + ' clicked!';
      });
    };
  });
