angular.module('JobsCtrl', [])
  .controller('JobsController', function($scope, JobService, $filter) {
    var _activeJobs, _cancelledJobs;
    $scope.formData = {};
    
    JobService.index()
      .success(function(data){
        $scope.jobs = data;
        _activeJobs = $filter('filter')($scope.jobs, {state: '!cancelled'});
        _cancelledJobs = $filter('filter')($scope.jobs, {state: 'cancelled'});
      })
      .error(function(data){
        console.log("error: " + data);
      });

    $scope.activeJobs = function(){
      return _activeJobs;
    }

    $scope.cancelledJobs = function(){
      return _cancelledJobs;
    }

    $scope.createJob = function(){
      JobService.create($scope.formData)
        .success(function(data){
          $scope.formData = {};
          $scope.jobs.push(data);
          _activeJobs = $filter('filter')($scope.jobs, {state: '!cancelled'});
        })
        .error(function(data){
          console.log("error: " + data)
        })
    };

    $scope.deleteJob = function(id){
      JobService.delete(id)
        .success(function(data){
          $scope.jobs = $filter('filter')($scope.jobs, {_id: '!' + id});
          _cancelledJobs = $filter('filter')($scope.jobs, {state: 'cancelled'});
        })
        .error(function(data){
          console.log("error: " + data);
        })
    }
});