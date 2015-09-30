var appControllers = angular.module('appControllers', ['ngRoute', 'ui.bootstrap']);

appControllers.controller('connectionCtrl', ['$scope', 'socket', function ($scope, socket) { 
    socket.on('connect', function (data) {
        console.log("connected");
        $('.online').css('color','limegreen');
    });
    
    socket.on('event', function(data){
        console.log('Data received: ' + data);
    });
    
    socket.on('disconnect', function(){
        console.log('Disconnected');
        $('.online').css('color','red');
    });
    
}]);

appControllers.controller('traditionalCtrl', function ($scope) {
    console.log("Tradtional controller loaded");
});

appControllers.controller('sinergyCtrl', ['$scope', 'socket', function ($scope, socket) { 
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
        socket.emit('newSize', {
          size: $scope.size
        });
    }
}]);