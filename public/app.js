var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	//$locationProvider.html5Mode(true).hashPrefix('!');
	$routeProvider
			.when('/', {
				templateUrl: 'views/home.view.html',
				controller: 'homeCtrl'
			})
			.when('/login', {
				templateUrl: 'views/login.view.html',
				controller: 'loginCtrl'
			})
			.when('/profile', {
				templateUrl: 'views/welcome.view.html',
				controller: 'welcomeCtrl'
			})
			.when('/registerReq', {
				templateUrl: 'views/registerReq.view.html',
				controller: 'registerReqCtrl'
			})
			.when('/get-employees', {
				templateUrl: 'views/employees.view.html',
				controller: 'employeesCtrl'
			})
			.when('/update/:id', {
				templateUrl: 'views/update.view.html',
				controller: 'updateCtrl'
			})
			.when('/forgot', {
				templateUrl: 'views/forgot.view.html',
				controller: 'forgotCtrl'
			})
			.when('/api/reset/:ptoken', {
				templateUrl: 'views/reset.view.html',
				controller: 'resetCtrl'
			})
			.when('/createNewEmployee', {
				templateUrl: 'views/createNewEmployee.view.html',
				controller: 'createNewEmployeeCtrl'
			})
			.when('/api/reset/newEmployee/:ptoken', {
				templateUrl: 'views/resetNewEmployee.view.html',
				controller: 'resetNewEmployeeCtrl'
			})
			.when('/forbidden', {
				templateUrl: 'views/forbidden.view.html',
				controller: 'forbiddenCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});

			 // $locationProvider.html5Mode({
			 // 	enabled: true,
			 // 	requireBase: false
			 // }).hashPrefix('!');

}]);

app.run(['$rootScope', '$location', 'authentication', 
	function($rootScope, $location, authentication){
		  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      	  if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
          $location.path('/');
      }
    });

}]);