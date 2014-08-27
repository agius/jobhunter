angular.module('JobsCtrl', [])
  .controller('JobsController', function($scope, JobService, $filter) {
    $scope.formData = {};
    JobService.index()
      .success(function(data){
        $scope.jobs = data;
      })
      .error(function(data){
        console.log("error: " + data);
      });

    $scope.activeJobs = function(){
      return $filter('filter')($scope.jobs, {state: '!cancelled'});
    }

    $scope.cancelledJobs = function(){
      return $filter('filter')($scope.jobs, {state: 'cancelled'});
    }

    $scope.createJob = function(){
      JobService.create($scope.formData)
        .success(function(data){
          $scope.formData = {};
          $scope.jobs.push(data);
        })
        .error(function(data){
          console.log("error: " + data)
        })
    };

    $scope.deleteJob = function(id){
      JobService.delete(id)
        .success(function(data){
          $scope.jobs = $filter('filter')($scope.jobs, {_id: '!' + id});
        })
        .error(function(data){
          console.log("error: " + data);
        })
    }
});