angular.module('myApp')
	.controller('logoutCtrl', ['$scope', 'authentication', '$location',
		function($scope, authentication, $location){
		$scope.onLogout = function(){
			alert('logout function');

			authentication.logout();
			$location.path('/');
				

		};
	}]);