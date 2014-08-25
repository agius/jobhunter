angular.module('JobsCtrl', [])
  .controller('JobsController', function($scope, $http, $filter) {
    $scope.formData = {};
    $http.get('/api/jobs')
      .success(function(data){
        $scope.jobs = data;
        console.log(data);
      })
      .error(function(data){
        console.log("error: " + data);
      });

    $scope.createJob = function(){
      console.log('submitting new job');
      console.log($scope.formData);
      $http.post('/api/jobs', $scope.formData)
        .success(function(data){
          $scope.formData = {};
          $scope.jobs.push(data);
          console.log(data);
        })
        .error(function(data){
          console.log("error: " + data)
        })
    };

    $scope.deleteJob = function(id){
      $http.delete('/api/jobs/' + id)
        .success(function(data){
          $scope.jobs = $filter('filter')($scope.jobs, {_id: '!' + id});
          console.log(data);
        })
        .error(function(data){
          console.log("error: " + data);
        })
    }
});