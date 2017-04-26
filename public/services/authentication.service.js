angular.module('myApp')
	.service('authentication', ['$http', '$window', '$routeParams',
   function($http, $window, $routeParams){
	
	 var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
      console.log($window.localStorage);
    };

    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentEmployee = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

 /*   register = function(employee) {
      return $http.post('/api/register', employee).success(function(data){
        saveToken(data.token);

      });
    };*/

    login = function(employee) {
      return $http.post('/api/login', employee).success(function(data) {
        saveToken(data.token);
      });
    };

    forgot = function(employee){
      return $http.post('/api/forgot', employee).success(function(data){
          console.log('async waterfall executed');
      });
    };

    reset = function(employee){
      return $http.post('/api/reset/'+$routeParams.ptoken, employee).success(function(data){
          console.log('password reset done');
      });
    };

    logout = function() {
      $window.localStorage.removeItem('mean-token');
      console.log("token removed",$window.localStorage);
    };	

    return {
   	  currentEmployee : currentEmployee,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      // register : register,
      login : login,
      logout : logout,
      forgot: forgot,
      reset: reset
    }; 	
		
	}]);