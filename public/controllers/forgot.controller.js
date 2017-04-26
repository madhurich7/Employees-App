angular.module('myApp')
	.controller('forgotCtrl', ['$scope', 'authentication', '$location',
	 function($scope, authentication, $location){

		$scope.onReset = function(){
			alert('on reset');
			var emaile = {
				email: $scope.email
			};

			authentication.forgot(emaile)
					      .error(function(err){
					      	console.log('reset not done');
					      	$location.path('/forgot');

					      }).then(function(){
			 				console.log("then function in login");
			 				$location.path('/profile');

	 			});
		};
		
	}]);