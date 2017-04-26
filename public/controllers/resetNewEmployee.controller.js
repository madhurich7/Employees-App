angular.module('myApp')
	.controller('resetNewEmployeeCtrl', ['$scope', 'adminData', '$location', '$http',
	 function($scope, adminData, $location, $http){

		$scope.updatePassword = function(){
			alert('on update for new emp');
			var pswds = {
				newPassword: $scope.newPassword,
				confirmPassword: $scope.confirmPassword,
				dl: $scope.dl
			};

			adminData.resetNewEmployee(pswds)
						  .success(function(){
						  	$scope.success = "Success! your password is updated, click on login\
						  	to login to your account";
						  })
					      .error(function(err){
					      	console.log('reset not done for new emp');
					      	$scope.message = "Token has expired or the details entered are not valid"; 
					      	$scope.newPassword = "";
					      	$scope.confirmPassword = "";
					      	$scope.dl = "";

					      	//$location.path('/forgot');

					      }).then(function(){
			 				console.log("then function in login");
			 				$location.path('/profile');

	 			});
		};
		
	}]);