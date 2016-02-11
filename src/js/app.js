var mainApp = angular.module('mainApp', [
    'ngRoute',
    'appControllers',
    "pageslide-directive"
]);

//Change socket configuration to link to server on local or remote.
//To use server on local use 'node server.js' command
mainApp.factory('socket', ['$rootScope', function ($rootScope) {
    //var socket = io("https://wesizeit.herokuapp.com");
    var socket = io('http://localhost:3000');
  return {
      
    getSocket : function () {
        return socket;
    },

    on: function (eventName, callback) {
        function wrapper() {
            var args = arguments;
            $rootScope.$apply(function () {
                callback.apply(socket, args);
            });
        }
        
        socket.on(eventName, wrapper);
        
        return function () {
            socket.removeListener(eventName, wrapper);
        };
    },

    emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                if(callback) {
                    callback.apply(socket, args);
                }
            });
        });
    }
  };
}]);
