angular.module('JobsCtrl', [])
  .controller('JobsController', function($scope, JobService, $filter) {
    var _activeJobs, _cancelledJobs;
    $scope.formData = {};
    $scope.states = JobService.getStates();
    $scope.filter = 'active';
    $scope.order = 'progress';
    $scope.detailIds = [];

    $scope.buttons = {
      filters: false,
      buttons: false
    };
    
    JobService.index()
      .success(function(data){
        $scope.jobs = data;
        $scope.refreshJobs();
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

    $scope.refreshJobs = function(){
      _activeJobs = $filter('jobstate')($scope.jobs, $scope.filter);
      _cancelledJobs = $filter('jobstate')($scope.jobs, 'cancelled');
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
          $scope.refreshJobs();
        })
        .error(function(data){
          console.log("error: " + data)
        })
    }

    $scope.deleteJob = function(id){
      JobService.delete(id)
        .success(function(data){
          $scope.jobs = $filter('filter')($scope.jobs, {_id: '!' + id});
          $scope.refreshJobs();
        })
        .error(function(data){
          console.log("error: " + data);
        })
    }

    $scope.updateJob = function(jobData){
      JobService.update(jobData);
    }

    $scope.stateNames = function(){
      return _.keys($scope.states);
    }

    $scope.filterState = function(_filter, button){
      if(!_.empty(button)){
        $scope.buttons[button] = false;
      }
      $scope.filter = _filter;
      $scope.refreshJobs();
    }

    $scope.setOrder = function(_order, button){
      if(!_.empty(button)){
        $scope.buttons[button] = false;
      }

      switch(_order){
        case 'progress':
          $scope.order = function(_job){
            return _.indexOf(
              _.keys(JobService.getStates()),
              _job.state
            );
          };
          break;
        case 'awesomeness':
          $scope.order = function(_job){
            if(_.empty(_job.awesomeness)) { return 0; }
            return _job.awesomeness;
          };
          break;
        default:
          $scope.order = _order;
      }
    }
});