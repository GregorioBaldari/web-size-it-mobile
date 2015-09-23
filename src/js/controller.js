var appControllers = angular.module('appControllers', ['ngRoute', 'ui.bootstrap']);
//var synergyApp = angular.module('sinergy', ['ui.bootstrap']);
//var traditionalApp = angular.module('traditional', ['ui.bootstrap']);

/*
appControllers.controller('mainController', function ($scope, $route, $routeParams, $location) {
    console.log("Main controller loaded");
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
})
*/

appControllers.controller('traditionalCtrl', function ($scope) {
    $scope.params = $routeParams;
    console.log("Tradtional controller loaded");
});

appControllers.controller('sinergyCtrl', function ($scope) {
    $scope.params = $routeParams;
    console.log("Sinergy controller loaded");
    $scope.risk = 1;
    $scope.effort = 1;
    $scope.complexity = 1;
    $scope.size  = "Select values above";
    
    $scope.$watch('risk', function (newValue, oldValue) {
        $scope.updateSize();
    });
    
    $scope.$watch('effort', function (newValue, oldValue) {
        $scope.updateSize();
    });
    
    $scope.$watch( 'complexity', function (newValue, oldValue) {
        $scope.updateSize();
    });
                         
    $scope.updateSize = function (size) {  
        $scope.size = $scope.risk * ($scope.complexity + $scope.effort);
        console.log("LOG: Size: " + $scope.size);
    };                                       
});

