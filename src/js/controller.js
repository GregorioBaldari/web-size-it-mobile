var appControllers = angular.module('appControllers', ['ngRoute', 'ui.bootstrap','pageslide-directive']);

appControllers.controller('appCtrl', ['$scope', 'socket', function ($scope, socket) {
    $scope.model = {
        risk: 1,
        effort: 1,
        complexity: 0,
        size: 1,
        connected: "true",
        userName: "Anonymous"
        //userId: undefined
    };
    
    //Menu open/close variable
    $scope.checked = false; // This will be binded using the ps-open attribute
    
    $scope.$watch('model.risk', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.sendModel();
        }
    });
    
    $scope.$watch('model.effort', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.sendModel();
        }
    });
    
    $scope.$watch( 'model.complexity', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.sendModel();
        }
    });
    
    $scope.$watch( 'model.userName', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.sendModel();
        }
    });          
                         
    $scope.sendModel = function () {  
        $scope.model.size = $scope.model.risk * ($scope.model.complexity + $scope.model.effort);
        console.log("LOG: Size: " + $scope.model.size);
        socket.emit('updateModel', {
            risk: $scope.model.risk,
            effort: $scope.model.effort,
            complexity: $scope.model.complexity,
            size: $scope.model.size,
            userName: $scope.model.userName,
            connected: $scope.model.connected
            //userId: $scope.model.userId
        });
    }
    
    //Open or close the menu
    $scope.toggle = function(){
        $scope.checked = !$scope.checked
    };
 
    //When connection is established make green the connection icon
    socket.on('connect', function (data) {
        console.log("connected");
        $('.online').css('color','limegreen');
    });
 
    //When connection is off make red the connection icon
    socket.on('disconnect', function(){
        console.log('Disconnected');
        $('.online').css('color','red');
    });
    
}]);

