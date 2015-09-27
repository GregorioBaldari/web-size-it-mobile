var mainApp = angular.module('mainApp', [
    'ngRoute',
    'appControllers'
]);

mainApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/sinergy', {
        templateUrl: 'template/sinergy.html',
        controller: 'sinergyCtrl'
      }).
      when('/traditional', {
        templateUrl: 'template/traditional.html',
        controller: 'traditionalCtrl'
      }).
      otherwise({
        redirectTo: '/sinergy'
      });
  }]);

//FInd a way to set global variable. Or is $scope enought?
mainApp.service('appVars', function () {
        var socket;

        return {
            getSocket: function () {
                return socket;
            },
            setSocket: function(value) {
                socket = value;
            }
        };
    });