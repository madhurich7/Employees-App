angular.module('myApp')
	.controller('registerReqCtrl', ['$scope', '$location', 'adminData',
	 function($scope, $location, adminData){
	 	$scope.here = "iam here";
	 	$scope.onRegisterReq = function(){
	 		alert('register request function');

	 		if(($scope.name !== "") && ($scope.email !== "") && ($scope.dl !== "")){
		 		var details = {
		 			name: $scope.name,
		 			email: $scope.email,
		 			dl: $scope.dl
		 		};
		 			console.log(details);

		 		adminData
		 			.registerReq(details)
		 			.success(function(status){
		 				console.log('status ' + status);
		 				$scope.success = "Success! Registration request has been sent to admin";
		 				$scope.name = "";
		 				$scope.email = "";
		 				$scope.dl = "";
		 			})
		 			.error(function(err){
		 				alert(err);
		 			});
		 		}else{
		 			$scope.message = "enter valid details";
	 			 	
	 	}
		 		};
		
	}]);