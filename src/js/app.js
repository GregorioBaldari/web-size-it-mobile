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
      when('/traditonal', {
        templateUrl: 'template/traditional.html',
        controller: 'traditionalCtrl'
      }).
      otherwise({
        redirectTo: '/sinergy'
      });
  }]);