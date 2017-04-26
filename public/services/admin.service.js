angular.module('myApp')
	.service('adminData', ['$http', 'authentication', '$window', '$routeParams',
		function($http, authentication, $window, $routeParams){
		   var getAllEmployees = function () {
	      		return $http.get('/api/employees', {
	        	headers: {
	            Authorization: 'Bearer '+ authentication.getToken()
        	}
      	});
    };

    		var createNewEmployee = function(credentials){
    			//console.log($window.localStorage['mean-token']);
    						return $http.post('/api/newEmployee', credentials,  {
				        	headers: {
				            Authorization: 'Bearer '+ authentication.getToken()
			        	}
      				});			
    	
    };

     var resetNewEmployee = function(employee){
      return $http.post('/api/reset/newEmployee/'+$routeParams.ptoken, employee).success(function(data){
          console.log('password reset done for new employee');
      });
    };


     var registerReq = function(details){
      return $http.post('/api/req/newEmployee', details).success(function(data){
         res.status(200).send('request sent to admin');
      });
    };

    return {
      getAllEmployees : getAllEmployees,
      createNewEmployee: createNewEmployee,
      resetNewEmployee: resetNewEmployee,
      registerReq: registerReq 
    };

	}]);