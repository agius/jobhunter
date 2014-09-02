angular.module('JobsCtrl', [])
  .controller('JobsController', function($scope, JobService, $filter) {
    var _activeJobs, _cancelledJobs;
    $scope.formData = {};
    $scope.states = JobService.getStates();
    $scope.filter = 'all';
    $scope.order = 'createdAt';
    $scope.detailIds = [];

    $scope.buttons = {
      filters: false
    };
    
    JobService.index()
      .success(function(data){
        $scope.jobs = data;
        _activeJobs = $filter('jobstate')($scope.jobs, 'active');
        _cancelledJobs = $filter('jobstate')($scope.jobs, 'cancelled');
      })
      .error(function(data){
        console.log("error: " + data);
      });

    $scope.detailsOpen = function(id){
      return _.contains($scope.detailIds, id);
    }

    $scope.toggleDetails = function(id){
      if(_.contains($scope.detailIds, id)){
        $scope.detailIds = _.without($scope.detailIds, id);
      } else {
        $scope.detailIds.push(id);
      }
    }

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
          $scope.detailIds.push(data._id);
          _activeJobs = $filter('jobstate')($scope.jobs, 'active');
        })
        .error(function(data){
          console.log("error: " + data)
        })
    }

    $scope.deleteJob = function(id){
      JobService.delete(id)
        .success(function(data){
          $scope.jobs = $filter('filter')($scope.jobs, {_id: '!' + id});
          _activeJobs = $filter('jobstate')($scope.jobs, 'active');
          _cancelledJobs = $filter('jobstate')($scope.jobs, 'cancelled');
        })
        .error(function(data){
          console.log("error: " + data);
        })
    }

    $scope.stateNames = function(){
      return _.keys($scope.states);
    }

    $scope.filterState = function(filter, button){
      if(!_.empty(button)){
        $scope.buttons[button] = false;
      }
      _activeJobs = $filter('jobstate')($scope.jobs, filter);
    }

    $scope.setOrder = function(_order, button){
      if(!_.empty(button)){
        $scope.buttons[button] = false;
      }
      
      if(_order == 'progress'){
        $scope.order = function(_job){
          return _.indexOf(
            _.keys(JobService.getStates()),
            _job.state
          );
        }
      } else {
        $scope.order = _order;
      }
    }
});