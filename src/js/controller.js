var appControllers = angular.module('appControllers', ['ngRoute', 'ui.bootstrap']);

/* This controller can Work if you find a way to inject the socket in the watch handler
appControllers.controller('connectionCtrl', ['$scope', 'socket', function ($scope, socket) { 
    socket.on('connect', function (data) {
      console.log("connected")
    });
    
    socket.on('event', function(data){
        console.log('Data received: ' + data);
    });
    
    socket.on('disconnect', function(){
        console.log('Disconnected');
    });
    
    $scope.$watch('connection', function (newValue, oldValue) {
        console.log('Connection is: ' + newValue);
        if(newValue) {
            if (socket.disconnected) {
                socket.connect();
            }
        } else {
            socket.disconnect()
        }
    });
}]);
*/

appControllers.controller('connectionCtrl', function ($scope, appVars) {
    console.log("Connection controller loaded");
    appVars.setSocket(io('http://localhost:3000'));
    appVars.getSocket().on('connect', function(){
        console.log("connected")
    });
    appVars.getSocket().on('event', function(data){
        console.log('Data received: ' + data);
    });
    appVars.getSocket().on('disconnect', function(){
        console.log('Disconnected');
    });;
    $scope.$watch('connection', function (newValue, oldValue){
        console.log('Connection is: ' + newValue);
        if(newValue) {
            if (appVars.getSocket().disconnected) {
                appVars.getSocket().connect();
            }
        }else {
            appVars.getSocket().disconnect()
            }
        });
});

appControllers.controller('traditionalCtrl', function ($scope) {
    console.log("Tradtional controller loaded");
});

appControllers.controller('sinergyCtrl', function ($scope,appVars) {
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
        if (appVars.getSocket().connected) {
            appVars.getSocket().emit('newSize', {
          size: $scope.size
        });
        }
    };
    
    /* if io is true send via the value */
    
});

