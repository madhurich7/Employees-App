angular.module('myApp')
	.controller('createNewEmployeeCtrl', ['$scope', '$location', 'adminData', '$rootScope',
	 function($scope, $location, adminData, $rootScope){
	 	$scope.onCreateNewEmployee = function(){
	 		alert('on create');
	 		if($scope.password === $scope.confirmPassword){
	 			var credentials = {
	 			name: $scope.name,
	 			email: $scope.email,
	 			password: $scope.password
	 		};
	 			console.log(credentials);
	 			
	 			adminData
	 			.createNewEmployee(credentials)
	 			.error(function(err){
	 				console.log(err);
	 				$location.path('/forbidden');
	 			})
	 			.success(function(status){
	 				console.log(status);
	 				$rootScope.newEmployee = "An email has been sent to the new employee";
	 				//$location.path('/get-employees');
	 				$scope.name = "";
	 				$scope.email = "";
	 				$scope.password = "";
	 			});

	 		}else{
	 			$scope.message = 'passwords din\'t match';
	 			$scope.password = "";
	 			$scope.confirmPassword = "";
	 		}
	 		
	 	
	 	};
		
	}]);