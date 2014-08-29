angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $location) {
  $scope.registration = {}; // data for register form
  $scope.login = {};        // data for login form
  $scope.user = {};         // user returned from server

  $http.get('/api/session')
    .success(function(data){
      $scope.user = data;
    })
    .error(function(data){
      console.log("error: " + data);
    });

  $scope.register = function(){
    $http.post('/api/users', $scope.registration)
      .success(function(data){
        $scope.user = data;
        $location.path('/jobs');
      })
      .error(function(data){
        console.log("error: " + data);
      });
  }

  $scope.signIn = function(){
    $http.post('/api/session', $scope.login)
      .success(function(data){
        $scope.user = data;
        $location.path('/jobs');
      })
      .error(function(data){
        console.log("error: " + data);
      });   
  }

  $scope.signOut = function(){
    $http.delete('/api/session')
      .success(function(data){
        $scope.user = {};
        $location.path('/');
      })
      .error(function(data){
        console.log("error: " + data);
      })
  }
});