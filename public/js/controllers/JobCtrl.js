angular.module('JobCtrl', [])
  .controller('JobController', function($scope, JobService, $timeout) {
    
    $scope.editing = [];

    var timeout = null;
    var secondsToWaitBeforeSave = 2;

    $scope.stateInfo = function(state){
      return JobService.states[state] || JobService.states.base;
    }

    $scope.isEditing = function(field){
      return $scope.editing.indexOf(field) >= 0;
    }

    $scope.toggleEditing = function(field){
      var index = $scope.editing.indexOf(field);
      if(index >= 0){
        $scope.editing.splice(index, 1);
      } else {
        $scope.editing.push(field);
      }
    }

    $scope.updateJob = function(){
      JobService.update($scope.job);
    }

    $scope.setUpdate = function(newVal, oldVal){
      if (timeout) $timeout.cancel(timeout);
      if(newVal != oldVal){
        timeout = $timeout($scope.updateJob, secondsToWaitBeforeSave * 1000);
      }
    }

    $scope.setState = function(newState){
      var oldState = $scope.job.state;
      $scope.job.state = newState;
      // on cancel / uncancel, will kill this controller and swap to new scope
      // so don't wait
      if(oldState == 'cancelled' || newState == 'cancelled'){
        JobService.update($scope.job);
      }
    }

    $scope.$watchCollection('job', $scope.setUpdate);
});