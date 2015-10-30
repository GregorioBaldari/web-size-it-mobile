var appControllers = angular.module('appControllers', ['ngRoute', 'ui.bootstrap','pageslide-directive']);

appControllers.controller('sinergyCtrl', ['$scope', 'socket','appVars', function ($scope, socket, appVars) {
    $scope.model = {
        risk: 1,
        effort: 1,
        complexity: 1,
        size: "Select values above",
        userName: appVars.getUserName(),
        userId: undefined
    };
    
    appVars.setModel($scope.model);
    
    $scope.$watch('model.risk', function (newValue, oldValue) {
        $scope.updateSize();
    });
    
    $scope.$watch('model.effort', function (newValue, oldValue) {
        $scope.updateSize();
    });
    
    $scope.$watch( 'model.complexity', function (newValue, oldValue) {
        $scope.updateSize();
    });
                         
    $scope.updateSize = function () {  
        $scope.model.size = $scope.model.risk * ($scope.model.complexity + $scope.model.effort);
        $scope.model.userName = appVars.getUserName();
        $scope.model.id = socket.id;
        console.log("LOG: Size: " + $scope.model.size);
        socket.emit('updateSize', {
            risk: $scope.model.risk,
            effort: $scope.model.effort,
            complexity: $scope.model.complexity,
            size: $scope.model.size,
            userName: appVars.getUserName()
        });
    }
}]);

appControllers.controller('menuCtrl', ['$scope', 'socket', 'appVars', function ($scope, socket, appVars) {
    
    $scope.checked = false; // This will be binded using the ps-open attribute
    
    $scope.toggle = function(){
        $scope.checked = !$scope.checked
    };
    
    //Update the userName on typing
    $scope.$watch('model.userName', function (newValue, oldValue) {
        appVars.setUserName(newValue);
        appVars.getModel().userName = appVars.getUserName();
    });
    
    //This can be removed. Name is sent now when user modifies data.
    //When remove this callback remove olso the 'ok' btn on view.
    //Keep this if you want to modify the name on real time (Nice to have but not needed
    $scope.sendName = function() {
        socket.emit('newUser', {
              userName: appVars.getUserName()
            });
        console.log('Name sent: ' + appVars.getUserName());
    };

}]);

appControllers.controller('connectionCtrl', ['$scope', 'socket', function ($scope, socket) { 
    socket.on('connect', function (data) {
        console.log("connected");
        $('.online').css('color','limegreen');
    });
    
    //NOt sure what this does. keep for a while and than remove
    /*
    socket.on('event', function(data){
        console.log('Data received: ' + data);
    });
    */
    socket.on('disconnect', function(){
        console.log('Disconnected');
        $('.online').css('color','red');
    });
    
}]);

