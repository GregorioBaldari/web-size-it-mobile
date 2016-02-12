var appControllers = angular.module('appControllers', ['ngRoute', 'ui.bootstrap', 'pageslide-directive']);

appControllers.controller('appCtrl', ['$scope', 'socket', function ($scope, socket) {
    $scope.model = {
        risk: 1,
        effort: 1,
        complexity: 0,
        size: 1,
        connected: "true",
        userName: "Anonymous",
        password: "",
        room: ""
        //userId: undefined
    };
    $scope.userData = {};
    $scope.connectionStatus = false;
    
    //Save form data in the menu
    $scope.saveConnectionData = function () {
        $scope.toggle();
        $scope.userData.room = $scope.model.room;
        $scope.userData.userName = $scope.model.userName;
        $scope.userData.password = $scope.model.password;
        socket.emit('joiningRoom',  $scope.userData, function (connectionStatus) {
            $scope.connectionStatus = connectionStatus;
            console.log('Entered in room: ' + $scope.model.room);
            $('.online').css('color', 'limegreen');
        });
        $scope.sendModel();
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
    
    $scope.$watch('model.complexity', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.sendModel();
        }
    });
    
    $scope.sendModel = function () {
        $scope.model.size = $scope.model.risk * ($scope.model.complexity + $scope.model.effort);
        console.log("LOG: Size: " + $scope.model.size);
        socket.emit('updateModel', {
            model: $scope.model
        });
    };
    
    //Open or close the menu
    $scope.toggle = function () {
        $scope.checked = !$scope.checked;
    };
 
    //When connection is established make green the connection icon
    socket.on('connect', function (data) {
        console.log("Socket Connection Established");
    });
 
    //When connection is off make red the connection icon
    socket.on('disconnect', function () {
        console.log('Disconnected');
        $('.online').css('color', 'red');
    });
    
}]);

