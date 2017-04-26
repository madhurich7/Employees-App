angular.module('myApp')
	.controller('updateCtrl', ['$scope', '$http', '$routeParams',
	'$location', 'authentication', function($scope, $http, $routeParams, $location, authentication){

	$http.get('/api/employees/'+$routeParams.id).success(function(data){
        $scope.employee = data;
    });

    $scope.updateEmployee = function(){
    	var data = {
    				id: $routeParams.id,
			    	name: $scope.employee.name,
			    	email: $scope.employee.email
    				};

    	$http.put('/api/update', /*{headers: {
                Authorization: 'Bearer '+ authentication.getToken()}},*/ data)
            .success(function(data, status){
    		console.log("status here",status);
    	});

    		$location.path('/profile');
        };

    

}]);