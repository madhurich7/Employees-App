angular.module('myApp')
	.controller('employeesCtrl', ['$scope', 'adminData', '$location',
	 function($scope, adminData, $location){
	 	$scope.allEmps = {};

		adminData.getAllEmployees()
			.success(function(data){
				$scope.allEmps = data;
			})
			.error(function (e) {
			    console.log(e);
			    console.log("you are not authorized to look into this page");
			    $location.path('/forbidden');
			});

		
	}]);