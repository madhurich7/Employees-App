angular.module('myApp')
	.controller('loginCtrl', ['$scope', '$location', 'authentication',
	 function($scope, $location, authentication){
	 	//$scope.here = "iam here";
	 	$scope.onLogin = function(){
	 		alert('login function');
	 		var credentials = {
	 			email: $scope.email,
	 			password: $scope.password
	 		};
	 		console.log(credentials);

	 		authentication
	 			.login(credentials)
	 			.error(function(err){
	 				$scope.message = "please check you credentials";
	 				$scope.email = "";
	 				$scope.password = "";
	 				//alert(err);
	 			})
	 			.then(function(){
	 				console.log("then function in login");
	 				$location.path('/profile');

	 			});

	 	};
		
	}]);