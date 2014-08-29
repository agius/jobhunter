// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
    })
    .when('/login', {
      templateUrl: 'views/login.html'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html'
    })
    .when('/jobs', {
      templateUrl: 'views/job.html'
    })

  $locationProvider.html5Mode(true);

}]);