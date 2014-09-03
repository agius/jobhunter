angular.module('JobsCtrl', [])
  .controller('JobsController', function($scope, JobService, $filter) {
    var _activeJobs, _cancelledJobs;
    $scope.formData = {};
    $scope.states = JobService.getStates();
    $scope.query = '';
    $scope.filter = 'active';
    $scope.orderLabel = 'progress';
    $scope.reverse = true;
    $scope.detailIds = [];

    $scope.buttons = {
      filters: false,
      buttons: false
    };

    $scope.orders = {
      created: 'createdAt',
      updated: 'updatedAt',
      progress: function(_job){
        return _.indexOf(
          _.keys(JobService.getStates()),
          _job.state
        );
      },
      awesomeness: function(_job){
        if(_.empty(_job.awesomeness)) { return 0; }
        return _job.awesomeness;
      }
    };

    $scope.order = $scope.orders['progress'];
    
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

    $scope.$watch('query', function(newVal, oldVal){
      if(_.empty(newVal)){
        $scope.refreshJobs();
        return;
      }
      if(newVal != oldVal){
        _activeJobs = $filter('filter')(_activeJobs, {name: $scope.query});
      }
    });

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
          _activeJobs.unshift(data);
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

    $scope.direction = function(label, current){
      if(label == $scope.orderLabel){
        if(current){ return $scope.reverse ? 'down' : 'up'; }
        return $scope.reverse ? 'up' : 'down';
      }
      return 'down';
    }

    $scope.setOrder = function(_order, button){
      if(!_.empty(button)){
        $scope.buttons[button] = false;
      }
      
      if(_order == $scope.orderLabel){
        $scope.reverse = !$scope.reverse;
        return;
      } else {
        $scope.reverse = true;
      }

      $scope.orderLabel = _order;
      $scope.order = $scope.orders[_order];
    }
});