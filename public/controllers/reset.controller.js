angular.module('myApp')
	.controller('resetCtrl', ['$scope', 'authentication', '$location', '$http',
	 function($scope, authentication, $location, $http){

	 	$scope.resetReqEmployee = {};

	 	/*$http.get('/api/reset/:ptoken') 
	 	     .success(function(data) {
	 	     	$scope.resetReqEmployee = data;
	 	     })
			 .error(function (e) {
			        console.log(e);
			      });*/

		$scope.updatePassword = function(){
			alert('on update');
			var pswds = {
				newPassword: $scope.newPassword,
				confirmPassword: $scope.confirmPassword
			};

			authentication.reset(pswds)
					      .error(function(err){
					      	console.log('reset not done');
					      	//$location.path('/forgot');

					      }).then(function(){
			 				console.log("then function in login");
			 				$location.path('/profile');

	 			});
		};
		
	}]);