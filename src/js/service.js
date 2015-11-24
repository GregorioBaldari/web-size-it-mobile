angular.module('service', [])
    // Set remote location
    .constant('ENDPOINT_URI', 'http://localhost:3000/')
	// super simple service
	// each function returns a promise object 
	.factory('service', ['$http', function ($http,ENDPOINT_URI) {
		path = 'items/';

        function getUrl() {
            return ENDPOINT_URI + path;
        };
                         
        return {
			create : function (userData) {
				return $http.post( 'http://localhost:3000/api/user/', userData);
			}
		};
	}]);

